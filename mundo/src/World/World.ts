// Arquivo: ./mundo/src/World/World.ts
import * as THREE from 'three';
import Experience from '../Experience/Experience';
import Environment from './Environment';
import Player from '../Components/Player';
import Time from '../Utils/Time';
// Camera não é mais importada diretamente aqui para inicialização do Player
import Config from '../Config/Config';

export default class World {
    private experience: Experience;
    private scene: THREE.Scene;
    private time: Time;
    // private camera: Camera; // Não é mais necessário aqui para o construtor do Player
    private config: Config;

    public environment?: Environment;
    public player?: Player; // Jogador local (agora público para acesso pela Câmera via Experience)

    private worldSphere: THREE.Mesh;

    constructor(experience: Experience, config: Config) {
        this.experience = experience;
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        // this.camera = this.experience.camera; // Referência pode ser obtida de this.experience se necessário
        this.config = config;

        this.worldSphere = this.createWorldSphere();
        this.scene.add(this.worldSphere);

        this.environment = new Environment(this.experience, this.config);
        this.createMarkers();

        // O jogador precisa de uma normal de superfície inicial.
        // Pode ser qualquer vetor normalizado que represente um ponto na esfera.
        // Exemplo: perto do "polo norte" da esfera, mas ligeiramente deslocado para ter uma direção "frente" clara.
        const initialPlayerSurfaceNormal = new THREE.Vector3(0, 0.99, 0.01).normalize(); 
        
        this.player = new Player(this.experience, initialPlayerSurfaceNormal, true); // true = isLocalPlayer
        this.scene.add(this.player.mesh);

        console.log('World and initial elements created.');
    }

    private createWorldSphere(): THREE.Mesh {
        const worldGeometry = new THREE.SphereGeometry(this.config.world.radius, 64, 32);
        const worldMaterial = new THREE.MeshStandardMaterial({
            color: 0x228B22,
            side: THREE.FrontSide,
        });
        const sphere = new THREE.Mesh(worldGeometry, worldMaterial);
        sphere.name = "WorldSphere";
        sphere.receiveShadow = true;
        return sphere;
    }
    
    private placeOnSphereSurface(
        object: THREE.Object3D,
        surfaceNormal: THREE.Vector3,
        heightOffset: number = 0
    ): void {
        const surfacePoint = surfaceNormal.clone().multiplyScalar(this.config.world.radius);
        const finalPosition = surfacePoint.clone().add(surfaceNormal.clone().multiplyScalar(heightOffset));
        object.position.copy(finalPosition);
        object.up.copy(surfaceNormal);
        object.lookAt(this.scene.localToWorld(new THREE.Vector3(0,0,0))); // Olhar para o centro do mundo
    }

    private createMarkers(): void {
        const markerHeight = this.config.world.markers.height;
        const markerHeightOffset = markerHeight / 2;
        const markerGeometry = new THREE.BoxGeometry(markerHeight, markerHeight, markerHeight);
        const colors = this.config.world.markers.colors;

        const createMarker = (color: number, surfaceNormal: THREE.Vector3, name: string) => {
            const material = new THREE.MeshStandardMaterial({ color });
            const marker = new THREE.Mesh(markerGeometry, material);
            marker.name = name;
            marker.castShadow = true;
            this.placeOnSphereSurface(marker, surfaceNormal.normalize(), markerHeightOffset);
            this.scene.add(marker);
        };

        createMarker(colors['X+'], new THREE.Vector3(1, 0, 0), 'MarkerX+');
        createMarker(colors['X-'], new THREE.Vector3(-1, 0, 0), 'MarkerX-');
        createMarker(colors['Z+'], new THREE.Vector3(0, 0, 1), 'MarkerZ+');
        createMarker(colors['Z-'], new THREE.Vector3(0, 0, -1), 'MarkerZ-');
        createMarker(colors['Y+'], new THREE.Vector3(0, 1, 0), 'MarkerY+');
        createMarker(colors['Y-'], new THREE.Vector3(0, -1, 0), 'MarkerY-');
    }

    update(delta: number): void {
        if (this.player) {
            this.player.update(delta); // O jogador local agora é atualizado por eventos de input.
                                       // Este update pode ser para jogadores remotos ou outras lógicas.
        }
        if (this.environment) {
            // this.environment.update(delta); // Se o ambiente tiver atualizações (ex: ciclo dia/noite)
        }
    }

     dispose(): void {
      if (this.worldSphere) {
        this.scene.remove(this.worldSphere);
        this.worldSphere.geometry.dispose();
        (this.worldSphere.material as THREE.Material).dispose();
      }
       if (this.environment) this.environment.dispose();
       if (this.player) this.player.dispose(this.scene);
       
       // Remover marcadores
       const markersToRemove: THREE.Object3D[] = [];
       this.scene.traverse(child => {
           if (child.name.startsWith('Marker')) {
               markersToRemove.push(child);
           }
       });
       markersToRemove.forEach(marker => {
           this.scene.remove(marker);
           if (marker instanceof THREE.Mesh) {
               marker.geometry.dispose();
               (marker.material as THREE.Material).dispose();
           }
       });
      console.log('World disposed');
    }
}