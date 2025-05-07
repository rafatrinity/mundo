// Arquivo: ./mundo/src/Camera.ts
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import Experience from './Experience/Experience';
import Sizes from './Utils/Sizes';
import Config from './Config/Config';
// Player não é mais importado diretamente aqui para evitar dependência circular se Player precisasse de Camera.
// A instância do Player será obtida de Experience.world.player.

const CAMERA_LOOK_SENSITIVITY = 0.002;

export default class Camera {
    private experience: Experience;
    private sizes: Sizes;
    private scene: THREE.Scene;
    private canvas: HTMLCanvasElement;
    private config: Config;

    public instance: THREE.PerspectiveCamera; // Câmera Three.js real
    public controls: PointerLockControls;     // Para gerenciamento do bloqueio do ponteiro
    
    private pitchObject: THREE.Object3D;      // Objeto para controlar o pitch (inclinação vertical) da câmera
    private cameraEyeLevelLocalOffset: THREE.Vector3; // Posição local da câmera dentro do pitchObject

    private lookListenerId: string | null = null; // ID do listener para 'action:look'

    constructor(experience: Experience, config: Config) {
        this.experience = experience;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.config = config;

        this.pitchObject = new THREE.Object3D();
        // Adiciona o pitchObject à cena para que suas transformações sejam globais
        this.scene.add(this.pitchObject); 

        this.instance = this.createCameraInstance();
        this.pitchObject.add(this.instance); // Câmera é filha do pitchObject

        // Define a altura dos olhos da câmera localmente dentro do pitchObject
        const eyeHeight = this.config.player.cylinderHeight * 0.45 + this.config.player.radius * 0.5;
        this.cameraEyeLevelLocalOffset = new THREE.Vector3(0, eyeHeight, 0);
        this.instance.position.copy(this.cameraEyeLevelLocalOffset);

        this.controls = this.createControls(); // PointerLockControls opera no canvas, mas não rotaciona diretamente
        
        this.setupInputListeners(); // Escuta por 'action:look' para controlar o pitch
        this.setupResizeListener();
        this.setupPointerLockUI();
    }

    private createCameraInstance(): THREE.PerspectiveCamera {
        const camera = new THREE.PerspectiveCamera(
            this.config.camera.fov,
            this.sizes.aspectRatio,
            this.config.camera.near,
            this.config.camera.far
        );
        // A posição e rotação iniciais serão definidas pelo Player no primeiro update
        return camera;
    }

    private createControls(): PointerLockControls {
        // PointerLockControls é usado aqui principalmente para o mecanismo de bloqueio do ponteiro.
        // Suas rotações internas não são usadas diretamente para o pitchObject.
        // Passamos o canvas, não um objeto 3D, para evitar que ele tente controlar um objeto diretamente.
        // No entanto, a API do PLC espera um objeto. Usamos pitchObject, mas sua rotação
        // será explicitamente gerenciada.
        const controls = new PointerLockControls(this.pitchObject, this.canvas);
        // Não adicionamos controls.getObject() à cena aqui porque pitchObject já está.
        return controls;
    }

    private setupInputListeners(): void {
        this.lookListenerId = this.experience.inputManager.on('action:look', 
            ({ deltaY, deltaTime }: { deltaX: number, deltaY: number, deltaTime: number }) => {
            if (this.controls.isLocked) {
                this.handleCameraPitch(deltaY, deltaTime);
            }
        });
    }
    
    private handleCameraPitch(deltaY: number, deltaTime: number): void {
        const pitchSpeed = CAMERA_LOOK_SENSITIVITY; // deltaTime pode ser usado para suavizar
        const pitchAngleChange = -deltaY * pitchSpeed;

        // Aplica a mudança de pitch à rotação X local do pitchObject
        let newPitch = this.pitchObject.rotation.x + pitchAngleChange;
        
        // Limita o pitch para evitar que a câmera vire de cabeça para baixo
        const maxPitch = Math.PI / 2 - 0.01; // Quase 90 graus para cima
        const minPitch = -Math.PI / 2 + 0.01; // Quase 90 graus para baixo
        this.pitchObject.rotation.x = Math.max(minPitch, Math.min(maxPitch, newPitch));
    }

    private setupPointerLockUI(): void {
        const instructionsElement = document.getElementById('instructions');
        if (!instructionsElement) {
            const instructions = document.createElement('div');
            instructions.setAttribute('id', 'instructions');
            instructions.style.position = 'absolute';
            instructions.style.top = '50%';
            instructions.style.left = '50%';
            instructions.style.transform = 'translate(-50%, -50%)';
            instructions.style.padding = '10px 20px';
            instructions.style.fontFamily = 'Arial, sans-serif';
            instructions.style.fontSize = '16px';
            instructions.style.textAlign = 'center';
            instructions.style.color = '#ffffff';
            instructions.style.backgroundColor = 'rgba(0,0,0,0.7)';
            instructions.style.border = '1px solid #ffffff';
            instructions.style.borderRadius = '5px';
            instructions.style.cursor = 'pointer';
            instructions.style.zIndex = '10';
            instructions.innerHTML = 'Clique aqui para controlar';
            document.body.appendChild(instructions);

            instructions.addEventListener('click', () => { this.controls.lock(); }, false);
            this.controls.addEventListener('lock', () => { instructions.style.display = 'none'; });
            this.controls.addEventListener('unlock', () => { instructions.style.display = 'block'; });
        } else {
            // Se já existe, apenas garante que os listeners de lock/unlock estejam corretos
            // (Pode ser complexo se o elemento for recriado por HMR)
             this.controls.addEventListener('lock', () => { instructionsElement.style.display = 'none'; });
            this.controls.addEventListener('unlock', () => { instructionsElement.style.display = 'block'; });
             if (!instructionsElement.getAttribute('listenerAttached')) { // Evita múltiplos listeners de clique
                instructionsElement.addEventListener('click', () => { this.controls.lock(); }, false);
                instructionsElement.setAttribute('listenerAttached', 'true');
            }
        }
    }

    private setupResizeListener(): void {
        this.sizes.on('resize', () => {
            this.resize();
        });
    }

    resize(): void {
        this.instance.aspect = this.sizes.aspectRatio;
        this.instance.updateProjectionMatrix();
    }

    public update(): void {
        const player = this.experience.world?.player; // Acessa o jogador através do mundo

        if (player && player.isLocalPlayer) {
            // 1. Posiciona o pitchObject (pai da câmera) na posição do jogador
            this.pitchObject.position.copy(player.getPosition());

            // 2. Define a orientação base do pitchObject para corresponder à orientação do jogador (yaw + alinhamento com a esfera)
            // A rotação de pitch (this.pitchObject.rotation.x) é local e será preservada por esta atribuição de quaternion.
            const playerOrientation = player.getOrientation();
            const currentPitch = this.pitchObject.rotation.x; // Salva o pitch atual
            
            this.pitchObject.quaternion.copy(playerOrientation); // Define a orientação base (yaw + roll do jogador)
            this.pitchObject.rotation.x = currentPitch; // Reaplica o pitch local
            
            // A câmera (this.instance) é filha do pitchObject e já tem seu offset local (altura dos olhos)
            // e herdará a posição e orientação do pitchObject.
        }
    }

    dispose(): void {
        const instructions = document.getElementById('instructions');
        if (instructions && instructions.parentNode) {
            // Idealmente, removeria o listener de clique específico aqui.
            // Por simplicidade, apenas removemos o elemento se formos os únicos a criá-lo.
            // document.body.removeChild(instructions); // Cuidado se outros sistemas o usarem.
        }
        if (this.lookListenerId) {
            this.experience.inputManager.off('action:look', this.lookListenerId);
        }
        this.controls.dispose();
        
        // Remove o pitchObject da cena e limpa seus filhos
        if (this.pitchObject) {
            this.scene.remove(this.pitchObject);
            while(this.pitchObject.children.length > 0){
                this.pitchObject.remove(this.pitchObject.children[0]);
            }
        }
        // A instância da câmera (this.instance) não precisa ser removida da cena
        // se for filha do pitchObject e o pitchObject for removido.
    }
}