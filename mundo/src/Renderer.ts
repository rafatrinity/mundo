import * as THREE from 'three';
import Experience from './Experience/Experience'; // Precisaremos da instância Experience
import Sizes from './Utils/Sizes';
import Camera from './Camera'; // Precisaremos da instância da Camera
import Config from './Config/Config';

export default class Renderer {
    private experience: Experience;
    private sizes: Sizes;
    private scene: THREE.Scene;
    private camera: Camera;
    private canvas: HTMLCanvasElement;
    private config: Config;
    instance: THREE.WebGLRenderer; // Instância pública para acesso se necessário

    constructor(experience: Experience, config: Config) {
        this.experience = experience;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.canvas = this.experience.canvas;
        this.config = config;

        this.instance = this.createRenderer();
        this.setupResizeListener();
    }

    private createRenderer(): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: this.config.renderer.antialias,
        });
        renderer.setSize(this.sizes.width, this.sizes.height);
        renderer.setPixelRatio(this.sizes.pixelRatio);
        // Adicionar configurações futuras aqui (ex: shadow map, encoding)
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace; // Ou THREE.LinearSRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;

        return renderer;
    }

    private setupResizeListener(): void {
        this.sizes.on('resize', () => {
            this.resize();
        });
    }

    resize(): void {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update(): void {
        // Renderiza a cena com a câmera
        this.instance.render(this.scene, this.camera.instance);
    }

    dispose(): void {
      this.instance.dispose();
      // Remover listener do sizes? O dispose do sizes já limpa os callbacks.
    }
}