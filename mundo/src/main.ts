import Experience from './Experience/Experience';
import './style.css'; // Importa o CSS

// Pega o elemento canvas do DOM
const canvasElement = document.querySelector('#webgl') as HTMLCanvasElement | null;

if (!canvasElement) {
    console.error("Canvas element #webgl not found!");
} else {
    // Cria a instância da Experiência, passando o canvas
    const experience = new Experience(canvasElement);

    // O loop de animação é iniciado dentro do Time/Experience
    // Não precisamos mais da função animate() aqui.

     // Para debug no console
    (window as any).experience = experience;
    console.log("Application started. Access 'experience' in console for debugging.");

    // Lógica de Hot Module Replacement (HMR) para desenvolvimento com Vite (opcional)
    if (import.meta.hot) {
        import.meta.hot.dispose(() => {
            console.log('Disposing old Experience due to HMR');
            experience.dispose();
        });
         import.meta.hot.accept(() => {
            console.log('HMR update detected');
             // A recarga da página geralmente é suficiente aqui,
             // mas poderia tentar recriar a Experience se necessário.
             window.location.reload(); // Força recarga para garantir estado limpo
        });
    }
}
