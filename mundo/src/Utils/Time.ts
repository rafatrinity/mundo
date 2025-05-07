import EventEmitter from './EventEmitter';
import * as THREE from 'three';

export default class Time extends EventEmitter {
    start: number;
    current: number;
    elapsed: number;
    delta: number;
    private clock: THREE.Clock;

    constructor() {
        super();
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16; // Default delta (approx 60fps)
        this.clock = new THREE.Clock();

        // Não chamamos tick() aqui, o Experience chamará no loop
    }

    tick(): void {
        const newCurrent = Date.now();
        this.delta = this.clock.getDelta(); // Usa THREE.Clock para delta mais preciso
        this.current = newCurrent;
        this.elapsed = this.current - this.start;

        this.trigger('tick'); // Emite o evento 'tick' a cada frame
    }

    dispose(): void {
      // Nada específico para limpar além dos callbacks
      super.dispose();
    }
}