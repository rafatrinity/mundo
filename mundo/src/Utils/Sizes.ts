import EventEmitter from './EventEmitter';

export default class Sizes extends EventEmitter {
    width: number;
    height: number;
    pixelRatio: number;
    aspectRatio: number;

    constructor() {
        super();

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.aspectRatio = this.width / this.height;

        this.setupResizeListener();
    }

    private setupResizeListener(): void {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.aspectRatio = this.width / this.height;

            this.trigger('resize'); // Emite o evento 'resize'
        });
    }

    dispose(): void {
      // TODO: Remover event listener de resize se necessário (ou deixar, geralmente não causa problema)
      super.dispose(); // Limpa os callbacks registrados
    }
}