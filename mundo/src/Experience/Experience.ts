// Arquivo: ./mundo/src/Experience/Experience.ts
import * as THREE from 'three';
import Sizes from '../Utils/Sizes';
import Time from '../Utils/Time';
import Camera from '../Camera';
import Renderer from '../Renderer';
import World from '../World/World';
import InputManager from '../Managers/InputManager';
import Config from '../Config/Config';

export default class Experience {
    static instance: Experience | null = null;

    public canvas: HTMLCanvasElement;
    public sizes: Sizes;
    public time: Time;
    public scene: THREE.Scene;
    public camera: Camera; // Modificado para ser a classe Camera, não a instância THREE.PerspectiveCamera
    public renderer: Renderer;
    public world: World;
    public inputManager: InputManager;
    public config: Config;

    constructor(canvas: HTMLCanvasElement) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;

        if (!canvas) {
            throw new Error("Canvas element not provided to Experience");
        }
        this.canvas = canvas;

        this.sizes = new Sizes();
        this.time = new Time();
        this.config = new Config();
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);

        // InputManager precisa de Experience para acessar camera.controls.isLocked
        // e também para que Player/Camera possam acessar InputManager via Experience.
        this.inputManager = new InputManager(this); // Passa 'this' (Experience)

        // Camera agora é instanciada após InputManager, caso precise dele (embora não diretamente no construtor)
        this.camera = new Camera(this, this.config);
        
        this.renderer = new Renderer(this, this.config); // Renderer precisa de Experience para scene e camera.instance
        this.world = new World(this, this.config);     // World precisa de Experience para scene, time, config, inputManager

        this.sizes.on('resize', this.resize.bind(this)); // Usar bind ou arrow function para manter 'this'
        this.time.on('tick', this.update.bind(this));   // Usar bind ou arrow function

        console.log('Experience Initialized');
    }

    private update(): void {
        this.inputManager.update(this.time.delta); // Atualiza InputManager para emitir eventos de ação

        // Atualiza o mundo (que por sua vez atualiza o jogador local baseado nos eventos de ação)
        this.world.update(this.time.delta);

        // Atualiza a câmera (para seguir o jogador e aplicar pitch)
        this.camera.update();

        // Renderiza a cena
        this.renderer.update();
    }

    private resize(): void {
        // Camera e Renderer já escutam o evento 'resize' do Sizes internamente
        // ou têm métodos resize chamados por Experience.
        // Se Camera.resize() e Renderer.resize() forem autônomos (ouvindo Sizes),
        // esta chamada pode não ser necessária, mas não prejudica.
        this.camera.resize();
        this.renderer.resize();
    }

    dispose(): void {
        this.time.off('tick', this.update.bind(this)); // Precisa da referência exata da função para remover
        this.sizes.off('resize', this.resize.bind(this)); // ou usar IDs de listener

        this.inputManager.dispose();
        this.world.dispose();
        this.camera.dispose();
        this.renderer.dispose();
        
        // Limpeza da cena (geometrias, materiais não gerenciados pelos componentes)
        // this.scene.traverse((object) => { ... }); // Se necessário

        this.time.dispose();
        this.sizes.dispose();

        Experience.instance = null;
        console.log('Experience Disposed');
    }
}