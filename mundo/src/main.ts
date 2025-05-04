import * as THREE from 'three';

// 1. Cena (Scene)
// É o container para todos os objetos, luzes, etc.
const scene = new THREE.Scene();

// 2. Objeto 3D (Mesh)
// Um objeto visível é uma combinação de Geometria (formato) e Material (aparência)
// Geometria: Um cubo com lados de tamanho 1
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Material: Básico, não reage à luz, cor verde (hexadecimal)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// Mesh: Combina a geometria e o material
const cube = new THREE.Mesh(geometry, material);
// Adiciona o cubo à cena
scene.add(cube);

// 3. Câmera (Camera)
// Define como vemos a cena. PerspectiveCamera simula o olho humano.
// Argumentos: FOV (campo de visão), Aspect Ratio (largura/altura), Near plane, Far plane
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// Move a câmera um pouco para trás para que possamos ver o cubo (que está na origem 0,0,0)
camera.position.z = 3;
scene.add(camera); // Algumas abordagens adicionam a câmera à cena, outras não. É opcional aqui.

// 4. Renderer
// Responsável por desenhar (renderizar) a cena na tag <canvas> do HTML.
const canvas = document.querySelector('#webgl') as HTMLCanvasElement; // Pega o canvas do HTML
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
// Define o tamanho do renderer para o tamanho da janela
renderer.setSize(sizes.width, sizes.height);
// Define a densidade de pixels para evitar serrilhados em telas de alta resolução
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 5. Animação (Animation Loop)
// Função que será chamada em cada frame para atualizar e renderizar a cena
const animate = () => {
    // Solicita ao navegador que chame 'animate' na próxima atualização de frame
    requestAnimationFrame(animate);

    // Atualiza objetos (ex: rotaciona o cubo)
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Renderiza a cena a partir da perspectiva da câmera
    renderer.render(scene, camera);
};

// Inicia o loop de animação
animate();

// 6. Responsividade (Window Resize)
// Atualiza a câmera e o renderer quando a janela é redimensionada
window.addEventListener('resize', () => {
    // Atualiza o tamanho
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Atualiza o aspect ratio da câmera
    camera.aspect = sizes.width / sizes.height;
    // Atualiza a matriz de projeção da câmera (necessário após mudar aspect ratio)
    camera.updateProjectionMatrix();

    // Atualiza o tamanho do renderer
    renderer.setSize(sizes.width, sizes.height);
    // Atualiza a densidade de pixels (caso mude de tela, por exemplo)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

console.log('Hello World - Three.js initialized!');