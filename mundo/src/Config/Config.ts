// src/Config/Config.ts
import * as THREE from 'three'; // Import THREE para tipos se necessário

export default class Config {
    // --- Debugging ---
    public readonly debug = {
        logExperienceAccess: true, // Habilita o console.log em main.ts
        // Adicione outras flags de debug aqui (ex: stats.js, helpers)
        // showWorldAxes: false,
        // showLightHelpers: false,
    };

    // --- World Settings ---
    public readonly world = {
        radius: 50000,
        environment: {
            ambientLightIntensity: 0.6,
            sunLightIntensity: 1.2,
            // Posição inicial do sol (pode ser mais complexa depois)
            sunPosition: new THREE.Vector3(1, 1.5, 0.5).normalize().multiplyScalar(50000 * 1.5), // Exemplo baseado no código anterior
        },
        markers: {
            height: 10,
            colors: {
                'X+': 0xff0000,
                'X-': 0x0000ff,
                'Z+': 0xffff00,
                'Z-': 0x00ff00,
                'Y+': 0xffffff,
                'Y-': 0x808080,
            }
        }
    };

    // --- Player Settings ---
    public readonly player = {
        radius: 0.3,
        cylinderHeight: 1.2,
        // Usamos getters para valores derivados, garantindo consistência
        get totalHeight(): number {
            return this.cylinderHeight + 2 * this.radius;
        },
        get heightOffset(): number {
            return this.totalHeight / 2;
        },
        colors: {
            local: 0xffa500, // Laranja
            remote: 0xcccccc, // Cinza
        }
    };

    // --- Camera Settings ---
    public readonly camera = {
        fov: 75,
        near: 0.1,
        // Far plane precisa do raio do mundo, usamos um getter
        get far(): number {
            // Acessamos o raio do mundo do próprio config
            // Isso funciona bem se Config for um Singleton ou se a instância for consistente
            return Config.instance.world.radius * 2.5;
        },
        heightAboveSurface: 1.7,
        moveSpeed: 30.0,
    };

    // --- Renderer Settings ---
    public readonly renderer = {
        antialias: true,
        pixelRatio: {
            max: 2 // Limita o pixel ratio para performance
        },
        // Configurações futuras (descomente e ajuste quando implementar)
        // shadowMap: {
        //     enabled: true,
        //     type: THREE.PCFSoftShadowMap, // Ex: THREE.BasicShadowMap, THREE.PCFShadowMap, THREE.PCFSoftShadowMap, THREE.VSMShadowMap
        // },
        // outputColorSpace: THREE.SRGBColorSpace, // ou LinearSRGBColorSpace
        // toneMapping: THREE.ACESFilmicToneMapping, // Ex: NoToneMapping, LinearToneMapping, ReinhardToneMapping, CineonToneMapping, ACESFilmicToneMapping
        // toneMappingExposure: 1.0,
    };

    // --- Input Settings ---
    public readonly input = {
        keyMap: {
            // Movimento
            KeyW: 'forward', ArrowUp: 'forward',
            KeyS: 'backward', ArrowDown: 'backward',
            KeyA: 'left', ArrowLeft: 'left',
            KeyD: 'right', ArrowRight: 'right',
            // Ações futuras
            // Space: 'jump',
            // KeyE: 'interact',
        }
        // Adicionar configurações de sensibilidade do mouse, gamepad, etc. aqui
    };

    // --- Network Settings (Placeholder) ---
    public readonly network = {
        // serverUrl: 'ws://localhost:8080',
        // updateRate: 15, // Hz
    };

    // --- Singleton Pattern ---
    // Facilita o acesso global à configuração, especialmente para getters que dependem de outros valores
    private static _instance: Config | null = null;

    constructor() {
        if (Config._instance) {
            // Você pode lançar um erro, retornar a instância existente, ou apenas avisar.
            // console.warn("Config class is intended as a Singleton. Returning existing instance.");
            return Config._instance;
        }
        Config._instance = this;
    }

    // Getter estático para acessar a instância única
    public static get instance(): Config {
        if (!Config._instance) {
            new Config(); // Cria a instância se ela ainda não existe
        }
        return Config._instance!; // O '!' assume que a instância sempre existirá após a chamada
    }
}

// Opcional: Exportar uma instância diretamente se preferir não usar o Singleton estático
// export const config = new Config();