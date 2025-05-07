// Arquivo: ./mundo/src/Components/Player.ts
import * as THREE from 'three';
import Experience from '../Experience/Experience';
import Config from '../Config/Config';

const PLAYER_MOVE_SPEED = 5.0; // m/s na superfície da esfera
const PLAYER_LOOK_SENSITIVITY = 0.002;

export default class Player {
    private experience: Experience;
    private config: Config;
    public mesh: THREE.Mesh;
    public isLocalPlayer: boolean;
    private currentSurfaceNormal: THREE.Vector3; // Normal da superfície onde o jogador está

    // Orientação e vetores auxiliares
    private upVector = new THREE.Vector3(0, 1, 0); // Y local da cápsula é o "up"

    // Listeners IDs
    private moveListenerId: string | null = null;
    private lookListenerId: string | null = null;


    constructor(experience: Experience, initialSurfaceNormal: THREE.Vector3, isLocal: boolean) {
        this.experience = experience;
        this.config = this.experience.config;
        this.isLocalPlayer = isLocal;
        this.currentSurfaceNormal = initialSurfaceNormal.clone().normalize();

        this.mesh = this.createPlayerMesh();
        this.placeAndOrientOnSurface(this.currentSurfaceNormal);

        if (this.isLocalPlayer) {
            this.setupInputListeners();
        }
        console.log(`Player ${isLocal ? 'Local' : 'Remote'} created.`);
    }

    private createPlayerMesh(): THREE.Mesh {
        const playerGeometry = new THREE.CapsuleGeometry(
            this.config.player.radius,
            this.config.player.cylinderHeight,
            4, 8
        );
        const playerMaterial = new THREE.MeshStandardMaterial({
            color: this.isLocalPlayer ? this.config.player.colors.local : this.config.player.colors.remote,
            // wireframe: true
        });
        const playerAvatar = new THREE.Mesh(playerGeometry, playerMaterial);
        playerAvatar.name = this.isLocalPlayer ? "LocalPlayer" : "RemotePlayer";
        playerAvatar.castShadow = true;
        return playerAvatar;
    }

    private placeAndOrientOnSurface(surfaceNormal: THREE.Vector3, preserveYawQuaternion?: THREE.Quaternion): void {
        const worldRadius = this.config.world.radius;
        const playerHeightOffset = this.config.player.heightOffset;

        // Calcula a posição na superfície
        const surfacePoint = surfaceNormal.clone().multiplyScalar(worldRadius);
        const finalPosition = surfacePoint.add(surfaceNormal.clone().multiplyScalar(playerHeightOffset));
        this.mesh.position.copy(finalPosition);

        // Orienta a cápsula: seu eixo Y local (upVector) deve alinhar com a surfaceNormal
        const baseOrientation = new THREE.Quaternion().setFromUnitVectors(this.upVector, surfaceNormal);
        
        if (preserveYawQuaternion) {
            this.mesh.quaternion.multiplyQuaternions(baseOrientation, preserveYawQuaternion);
        } else {
            this.mesh.quaternion.copy(baseOrientation);
        }
        
        this.currentSurfaceNormal.copy(surfaceNormal);
    }
    
    private getYawQuaternion(): THREE.Quaternion {
        // Decompõe o quaternion atual para isolar a rotação em torno do eixo Y local (normal da superfície)
        const worldUp = this.currentSurfaceNormal.clone(); // Up do jogador no mundo
        const playerForward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.mesh.quaternion); // Direção para onde o jogador olha
        
        // Projeta "forward" no plano tangencial
        const forwardOnTangentPlane = playerForward.clone().projectOnPlane(worldUp).normalize();
        
        // Quaternion base (só alinhamento com a superfície)
        const baseOrientationInv = new THREE.Quaternion().setFromUnitVectors(this.upVector, worldUp).invert();
        
        // Isola a rotação de Yaw aplicando o inverso da orientação base
        const yawOnlyQuaternion = this.mesh.quaternion.clone().premultiply(baseOrientationInv);
        return yawOnlyQuaternion;
    }


    private setupInputListeners(): void {
        this.moveListenerId = this.experience.inputManager.on('action:move', 
            ({ directionVector, deltaTime }: { directionVector: THREE.Vector3, deltaTime: number }) => {
            this.handleMove(directionVector, deltaTime);
        });
        this.lookListenerId = this.experience.inputManager.on('action:look', 
            ({ deltaX, deltaTime }: { deltaX: number, deltaY: number, deltaTime: number }) => {
            // Player só se importa com deltaX para Yaw
            this.handleLook(deltaX, deltaTime);
        });
    }

    private handleMove(localDirection: THREE.Vector3, deltaTime: number): void {
        if (!this.isLocalPlayer) return;

        const moveSpeed = PLAYER_MOVE_SPEED;
        const distance = moveSpeed * deltaTime;

        if (distance === 0) return;

        // Converte a direção local para uma direção no espaço do mundo
        const worldDirection = localDirection.clone().applyQuaternion(this.mesh.quaternion).normalize();

        // Projeta a direção do movimento no plano tangencial à esfera
        const tangentMoveDirection = worldDirection.clone().projectOnPlane(this.currentSurfaceNormal).normalize();

        if (tangentMoveDirection.lengthSq() === 0) return; // Evita NaN se o movimento for diretamente contra a normal

        // Salva a rotação de "yaw" atual antes de mover
        const currentYaw = this.getYawQuaternion();

        // Calcula a rotação na esfera
        const rotationAxis = new THREE.Vector3().crossVectors(this.currentSurfaceNormal, tangentMoveDirection).normalize();
        const angle = distance / this.config.world.radius; // Pequeno ângulo: arco = raio * ângulo
        const deltaRotation = new THREE.Quaternion().setFromAxisAngle(rotationAxis, angle);

        // Aplica a rotação à normal da superfície atual para obter a nova normal
        const newSurfaceNormal = this.currentSurfaceNormal.clone().applyQuaternion(deltaRotation).normalize();
        
        // Reposiciona e reorienta o jogador na nova normal, preservando o yaw
        this.placeAndOrientOnSurface(newSurfaceNormal, currentYaw);
    }

    private handleLook(deltaX: number, deltaTime: number): void {
        if (!this.isLocalPlayer) return;

        const rotationSpeed = PLAYER_LOOK_SENSITIVITY; // Sensibilidade, deltaTime pode ser usado para suavizar
        const yawAngle = -deltaX * rotationSpeed; // Rotação em torno do eixo Y local (normal da superfície)

        if (yawAngle === 0) return;

        // Cria um quaternion para a rotação de yaw em torno da normal da superfície atual
        const yawRotation = new THREE.Quaternion().setFromAxisAngle(this.currentSurfaceNormal, yawAngle);

        // Aplica a rotação de yaw à orientação existente do jogador
        this.mesh.quaternion.premultiply(yawRotation);
        this.mesh.quaternion.normalize(); // Normaliza para evitar problemas de precisão
    }

    public update(deltaTime: number): void {
        // Para o jogador local, as atualizações são principalmente orientadas por eventos.
        // Este método pode ser usado para interpolação de jogadores remotos no futuro.
        if (!this.isLocalPlayer) {
            // Lógica de interpolação para jogadores remotos aqui...
            return;
        }
    }
    
    dispose(scene: THREE.Scene): void {
        if (this.isLocalPlayer) {
            if (this.moveListenerId) {
                this.experience.inputManager.off('action:move', this.moveListenerId);
            }
            if (this.lookListenerId) {
                this.experience.inputManager.off('action:look', this.lookListenerId);
            }
        }
        scene.remove(this.mesh);
        if (this.mesh.geometry) this.mesh.geometry.dispose();
        if (this.mesh.material) (this.mesh.material as THREE.Material).dispose();
        console.log(`Player ${this.isLocalPlayer ? 'Local' : 'Remote'} disposed`);
    }

    public getOrientation(): THREE.Quaternion {
        return this.mesh.quaternion;
    }

    public getPosition(): THREE.Vector3 {
        return this.mesh.position;
    }

    public getUpVector(): THREE.Vector3 { // Normal da superfície atual
        return this.currentSurfaceNormal.clone();
    }
}