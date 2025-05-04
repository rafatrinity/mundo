import * as THREE from 'three';

// 1. Cena (Scene)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Adiciona um fundo azul claro (céu)

// 2. Luzes
// Luz ambiente para iluminar todos os objetos uniformemente
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Cor branca, intensidade média
scene.add(ambientLight);

// Luz direcional para simular o sol
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Cor branca, intensidade total
directionalLight.position.set(50, 100, 25); // Posição da luz
scene.add(directionalLight);

// 3. Mundo Básico (Issue #3) - Esfera Planetária
// Geometria: Esfera gigante. O raio precisa ser grande.
// Um raio de 5000 unidades já dará a sensação de um plano próximo.
const worldRadius = 5000;
const worldGeometry = new THREE.SphereGeometry(
    worldRadius, // Raio
    64, // Segmentos horizontais (detalhe)
    32  // Segmentos verticais (detalhe)
);

// Material: Renderiza no lado interno e reage à luz.
const worldMaterial = new THREE.MeshStandardMaterial({
    color: 0x90EE90, // Verde claro para o "chão"
    side: THREE.BackSide // <<< IMPORTANTE: Renderiza o interior da esfera
});

// Mesh: Combina geometria e material
const worldSphere = new THREE.Mesh(worldGeometry, worldMaterial);
scene.add(worldSphere);

// 4. Marcadores Visuais (Issue #3)
const markerGeometry = new THREE.BoxGeometry(10, 10, 10); // Cubos de 10x10x10 unidades

// Marcador 1 (Vermelho) - Perto da origem
const markerMaterial1 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const marker1 = new THREE.Mesh(markerGeometry, markerMaterial1);
marker1.position.set(0, 5, -50); // Posição y=5 para ficar sobre o "chão" na origem
scene.add(marker1);

// Marcador 2 (Azul) - Mais distante
const markerMaterial2 = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const marker2 = new THREE.Mesh(markerGeometry, markerMaterial2);
marker2.position.set(100, 5, -150);
scene.add(marker2);

// Marcador 3 (Amarelo) - Em outra direção
const markerMaterial3 = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const marker3 = new THREE.Mesh(markerGeometry, markerMaterial3);
marker3.position.set(-80, 5, -100);
scene.add(marker3);


// 5. Câmera (Camera)
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
const camera = new THREE.PerspectiveCamera(
    75, // FOV
    sizes.width / sizes.height, // Aspect Ratio
    0.1, // Near plane (mantém)
    worldRadius * 2 // <<< IMPORTANTE: Far plane ajustado para ver a esfera inteira
);
// Posição inicial da câmera ligeiramente acima do "chão"
camera.position.set(0, 10, 0); // x=0, y=10 (altura), z=0
scene.add(camera);

// 6. Renderer
const canvas = document.querySelector('#webgl') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true // Ligar antialiasing para bordas mais suaves
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 7. Animação (Animation Loop)
const clock = new THREE.Clock(); // Relógio para movimento consistente

const animate = () => {
    const elapsedTime = clock.getElapsedTime(); // Tempo desde o início

    // Solicita ao navegador que chame 'animate' na próxima atualização de frame
    requestAnimationFrame(animate);

    // Atualizações podem vir aqui no futuro (ex: controles de câmera)
    // marker1.rotation.y = elapsedTime * 0.5; // Exemplo de animação de marcador

    // Renderiza a cena a partir da perspectiva da câmera
    renderer.render(scene, camera);
};

// Inicia o loop de animação
animate();

// 8. Responsividade (Window Resize)
window.addEventListener('resize', () => {
    // Atualiza o tamanho
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Atualiza o aspect ratio da câmera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Atualiza o tamanho do renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

console.log('Mundo Básico (Issue #3) inicializado com esfera planetária e marcadores.');
// Removido o cubo inicial: console.log('Hello World - Three.js initialized!');