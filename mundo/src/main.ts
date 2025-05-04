import * as THREE from 'three';

// 1. Cena (Scene)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// 2. Luzes
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(50, 100, 25);
scene.add(directionalLight);

// 3. Mundo Básico (Issue #3) - Esfera Planetária
const worldRadius = 5000;
const worldGeometry = new THREE.SphereGeometry(worldRadius, 64, 32);
const worldMaterial = new THREE.MeshStandardMaterial({
    color: 0x90EE90,
    side: THREE.BackSide
});
const worldSphere = new THREE.Mesh(worldGeometry, worldMaterial);
scene.add(worldSphere);

// 4. Marcadores Visuais (Issue #3)
const markerGeometry = new THREE.BoxGeometry(10, 10, 10);
const markerMaterial1 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const marker1 = new THREE.Mesh(markerGeometry, markerMaterial1);
marker1.position.set(0, 5, -50);
scene.add(marker1);
const markerMaterial2 = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const marker2 = new THREE.Mesh(markerGeometry, markerMaterial2);
marker2.position.set(100, 5, -150);
scene.add(marker2);
const markerMaterial3 = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const marker3 = new THREE.Mesh(markerGeometry, markerMaterial3);
marker3.position.set(-80, 5, -100);
scene.add(marker3);

// -----------------------------------------------------------------------------
// 5. Avatar Básico do Jogador (Issue #4)
// -----------------------------------------------------------------------------
const playerRadius = 0.5; // Raio da cápsula
const playerCylinderHeight = 1.0; // Altura da parte cilíndrica
const playerTotalHeight = playerCylinderHeight + 2 * playerRadius; // Altura total = cilindro + 2 calotas

const playerGeometry = new THREE.CapsuleGeometry(
    playerRadius,          // radius
    playerCylinderHeight,  // length (altura do cilindro)
    4,                     // capSegments
    8                      // radialSegments
);
const playerMaterial = new THREE.MeshStandardMaterial({
    color: 0xffa500 // Laranja
});
const playerAvatar = new THREE.Mesh(playerGeometry, playerMaterial);

// Posicionar o avatar. A posição Y é o centro da cápsula.
// Queremos que a base da cápsula esteja um pouco acima do "chão" (y=0 no centro da esfera, mas visualmente onde os marcadores estão em y=5).
// Assumindo que o "chão" está em y=0 (centro da esfera), a base da cápsula estaria em playerCenterY - playerTotalHeight / 2.
// Se quisermos a base em y=5, então: playerCenterY = 5 + playerTotalHeight / 2
const baseLevelY = 5; // Nível onde a base do avatar deve ficar
const playerCenterY = baseLevelY + (playerTotalHeight / 2);

playerAvatar.position.set(0, playerCenterY, -5); // Posição inicial perto da origem, um pouco à frente da câmera inicial.

scene.add(playerAvatar);
console.log('Avatar Básico (Issue #4) adicionado à cena.');
// -----------------------------------------------------------------------------

// 6. Câmera (Camera)
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    worldRadius * 2
);
// Ajustar ligeiramente a posição inicial da câmera para ver melhor o avatar
camera.position.set(0, 10, 10); // Afastada um pouco em Z para ver o avatar que está em z=-5
camera.lookAt(playerAvatar.position); // Faz a câmera olhar inicialmente para o avatar
scene.add(camera);

// 7. Renderer
const canvas = document.querySelector('#webgl') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 8. Animação (Animation Loop)
const clock = new THREE.Clock();
const animate = () => {
    requestAnimationFrame(animate);
    // Atualizações futuras aqui...
    renderer.render(scene, camera);
};
animate();

// 9. Responsividade (Window Resize)
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

console.log('Mundo Básico (Issue #3) inicializado com esfera planetária e marcadores.');