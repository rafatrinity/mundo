// Arquivo: ./mundo/src/Managers/InputManager.ts
import * as THREE from 'three';
import EventEmitter from '../Utils/EventEmitter';
import nipplejs, { JoystickManager } from 'nipplejs';
import Experience from '../Experience/Experience'; // Adicionado

export default class InputManager extends EventEmitter {
    public moveState: { [key: string]: boolean } = {
        forward: false,
        backward: false,
        left: false,
        right: false,
    };

    private keyMap: { [key: string]: string } = {
        KeyW: 'forward', ArrowUp: 'forward',
        KeyS: 'backward', ArrowDown: 'backward',
        KeyA: 'left', ArrowLeft: 'left',
        KeyD: 'right', ArrowRight: 'right',
    };

    private joystickManager: JoystickManager | null = null;
    private isTouchDevice: boolean = false;
    private experience: Experience; // Adicionado
    private accumulatedLookDelta = { x: 0, y: 0 };

    constructor(experience: Experience) { // Modificado
        super();
        this.experience = experience; // Armazena a instância de Experience
        this.isTouchDevice = this.detectTouchDevice();

        if (this.isTouchDevice) {
            this.setupJoystick();
            const instructions = document.getElementById('instructions');
            if (instructions) {
                instructions.style.display = 'none';
            }
        } else {
            this.setupKeyboardListeners();
            this.setupMouseLookListeners(); // Adicionado para capturar deltas do mouse
        }
    }

    private detectTouchDevice(): boolean {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    private setupKeyboardListeners(): void {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    private setupJoystick(): void {
        const joystickContainer = document.getElementById('joystick-container');
        if (!joystickContainer) {
            console.error('Joystick container not found!');
            return;
        }
        joystickContainer.style.display = 'block';

        const options: nipplejs.JoystickManagerOptions = {
            zone: joystickContainer,
            mode: 'static',
            position: { left: '50%', top: '50%' },
            color: 'white',
            size: 150,
            threshold: 0.1,
            fadeTime: 250,
            multitouch: false,
        };

        this.joystickManager = nipplejs.create(options);

        this.joystickManager.on('move', (evt, data) => {
            if (!data.direction) {
                this.resetMoveStateFromJoystick();
                this.trigger('moveStateChanged', this.moveState); // Ainda pode ser útil para UI
                return;
            }
            const angle = data.angle.degree;
            let newMoveState = { forward: false, backward: false, left: false, right: false };

            if (angle > 45 && angle < 135) newMoveState.forward = true;
            else if (angle > 225 && angle < 315) newMoveState.backward = true;

            if (angle > 135 && angle < 225) newMoveState.left = true;
            else if ((angle > 315 || angle < 45) && angle !== 0) newMoveState.right = true;
            
            if (JSON.stringify(this.moveState) !== JSON.stringify(newMoveState)) {
                this.moveState = newMoveState;
                this.trigger('moveStateChanged', this.moveState); // Ainda pode ser útil para UI
            }
        });

        this.joystickManager.on('end', () => {
            this.resetMoveStateFromJoystick();
            this.trigger('moveStateChanged', this.moveState); // Ainda pode ser útil para UI
        });
    }

    private resetMoveStateFromJoystick(): void {
        this.moveState.forward = false;
        this.moveState.backward = false;
        this.moveState.left = false;
        this.moveState.right = false;
    }

    private handleKeyDown = (event: KeyboardEvent): void => {
        const action = this.keyMap[event.code];
        if (action && !this.moveState[action]) {
            this.moveState[action] = true;
            this.trigger('moveStateChanged', this.moveState); // Ainda pode ser útil para UI
        }
    };

    private handleKeyUp = (event: KeyboardEvent): void => {
        const action = this.keyMap[event.code];
        if (action && this.moveState[action]) {
            this.moveState[action] = false;
            this.trigger('moveStateChanged', this.moveState); // Ainda pode ser útil para UI
        }
    };

    private setupMouseLookListeners(): void {
        document.addEventListener('mousemove', this.handleMouseMove);
    }

    private handleMouseMove = (event: MouseEvent): void => {
        // Acumula deltas apenas se o ponteiro estiver bloqueado
        if (this.experience.camera && this.experience.camera.controls && this.experience.camera.controls.isLocked) {
            this.accumulatedLookDelta.x += event.movementX || 0;
            this.accumulatedLookDelta.y += event.movementY || 0;
        }
    };

    public update(deltaTime: number): void {
        // Emitir 'action:move'
        const directionVector = new THREE.Vector3(); // Vetor local para o jogador
        if (this.moveState.forward) directionVector.z -= 1;
        if (this.moveState.backward) directionVector.z += 1;
        if (this.moveState.left) directionVector.x -= 1;
        if (this.moveState.right) directionVector.x += 1;

        if (directionVector.lengthSq() > 0) {
            directionVector.normalize(); // Normaliza para consistência de velocidade
            this.trigger('action:move', { directionVector, deltaTime });
        }

        // Emitir 'action:look'
        if (this.accumulatedLookDelta.x !== 0 || this.accumulatedLookDelta.y !== 0) {
            // Verifica novamente se o ponteiro está bloqueado ao emitir
             if (this.experience.camera && this.experience.camera.controls && this.experience.camera.controls.isLocked) {
                this.trigger('action:look', {
                    deltaX: this.accumulatedLookDelta.x,
                    deltaY: this.accumulatedLookDelta.y,
                    deltaTime // deltaTime pode ser usado para suavizar ou escalar a sensibilidade
                });
            }
            // Reseta deltas acumulados
            this.accumulatedLookDelta.x = 0;
            this.accumulatedLookDelta.y = 0;
        }
    }

    dispose(): void {
        if (!this.isTouchDevice) {
            document.removeEventListener('keydown', this.handleKeyDown);
            document.removeEventListener('keyup', this.handleKeyUp);
            document.removeEventListener('mousemove', this.handleMouseMove); // Remove listener do mouse
        }
        if (this.joystickManager) {
            this.joystickManager.destroy();
            const joystickContainer = document.getElementById('joystick-container');
            if (joystickContainer) {
                joystickContainer.style.display = 'none';
            }
        }
        super.dispose();
        console.log('InputManager disposed');
    }
}