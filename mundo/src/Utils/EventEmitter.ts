type CallbackFunction = (...args: any[]) => void;

export default class EventEmitter {
    private callbacks: { [eventName: string]: { [callbackName: string]: CallbackFunction } } = {};
    private nextCallbackId: number = 0;

    on(eventName: string, callback: CallbackFunction): string {
        if (!this.callbacks[eventName]) {
            this.callbacks[eventName] = {};
        }
        const callbackName = `callback_${this.nextCallbackId++}`;
        this.callbacks[eventName][callbackName] = callback;
        return callbackName; // Retorna um ID para poder remover depois, se necessário
    }

    off(eventName: string, callbackName: string): void {
        if (this.callbacks[eventName] && this.callbacks[eventName][callbackName]) {
            delete this.callbacks[eventName][callbackName];
            if (Object.keys(this.callbacks[eventName]).length === 0) {
                delete this.callbacks[eventName];
            }
        }
    }

    trigger(eventName: string, ...args: any[]): void {
        if (this.callbacks[eventName]) {
            Object.values(this.callbacks[eventName]).forEach(callback => {
                try {
                    callback(...args);
                } catch (error) {
                    console.error(`Error in EventEmitter callback for event "${eventName}":`, error);
                }
            });
        }
    }

    dispose(): void {
      this.callbacks = {};
      this.nextCallbackId = 0;
    }
}