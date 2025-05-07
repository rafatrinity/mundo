import * as THREE from 'three';
import Experience from '../Experience/Experience';
import Config from '../Config/Config';

export default class Environment {
    private experience: Experience;
    private scene: THREE.Scene;
    private sunLight: THREE.DirectionalLight;
    private ambientLight: THREE.AmbientLight;
    private config: Config;
    // private lightHelper?: THREE.DirectionalLightHelper; // Opcional para debug

    constructor(experience: Experience, config: Config) {
        this.experience = experience;
        this.scene = this.experience.scene;
        this.config = config;

        this.ambientLight = this.createAmbientLight();
        this.sunLight = this.createSunLight();

        this.scene.add(this.ambientLight);
        this.scene.add(this.sunLight);
        // this.scene.add(this.sunLight.target); // Alvo padrão é (0,0,0)

         // Helper para visualizar a luz
        // this.lightHelper = new THREE.DirectionalLightHelper(this.sunLight, 50);
        // this.scene.add(this.lightHelper);

        console.log('Environment (Lights) created.');
        // Carregar mapa de ambiente (HDRI) pode ser feito aqui futuramente
    }

    private createAmbientLight(): THREE.AmbientLight {
        const light = new THREE.AmbientLight(
            0xffffff,
            this.config.world.environment.ambientLightIntensity
        );
        light.name = "AmbientLight";
        return light;
    }

    private createSunLight(): THREE.DirectionalLight {
        const light = new THREE.DirectionalLight(
            0xffffff,
            this.config.world.environment.sunLightIntensity // Usar config
        );
        light.name = "SunLight";
        // Usar posição do config
        light.position.copy(this.config.world.environment.sunPosition);
        light.target.position.set(0, 0, 0);
          
        // Configurações de sombra (ativar se necessário)
        // light.castShadow = true;
        // light.shadow.mapSize.width = 2048;
        // light.shadow.mapSize.height = 2048;
        // light.shadow.camera.near = 0.5;
        // light.shadow.camera.far = WORLD_RADIUS * 3;
        // // Ajustar a área da sombra (frustum) para cobrir a área visível
        // const shadowCamSize = WORLD_RADIUS * 0.1; // Ajustar conforme necessário
        // light.shadow.camera.left = -shadowCamSize;
        // light.shadow.camera.right = shadowCamSize;
        // light.shadow.camera.top = shadowCamSize;
        // light.shadow.camera.bottom = -shadowCamSize;
        // light.shadow.bias = -0.001; // Ajustar para evitar shadow acne


        return light;
    }

    update(delta: number): void {
        // Animar a luz do sol, se desejado
        // Ex: Simular ciclo dia/noite
        // const angle = this.experience.time.elapsed * 0.00005; // Velocidade da rotação
        // this.sunLight.position.set(
        //     Math.cos(angle) * WORLD_RADIUS * 1.5,
        //     WORLD_RADIUS * 1.0, // Manter altura ou variar
        //     Math.sin(angle) * WORLD_RADIUS * 1.5
        // );
        // this.sunLight.lookAt(0, 0, 0);
        // if (this.lightHelper) this.lightHelper.update();
    }

    dispose(): void {
      this.scene.remove(this.ambientLight);
      this.scene.remove(this.sunLight);
      // this.scene.remove(this.sunLight.target);
      this.ambientLight.dispose();
      this.sunLight.dispose();
      // if (this.lightHelper) this.scene.remove(this.lightHelper);
      console.log('Environment disposed');
    }
}