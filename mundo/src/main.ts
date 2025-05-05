import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

// 1. Cena (Scene)
const scene = new THREE.Scene();
// Fundo pode ser espaço (preto) ou céu (azul), vamos manter azul por enquanto
scene.background = new THREE.Color(0x87CEEB);
const worldRadius = 5000;

// 2. Luzes
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
// Posicionar a luz mais distante para iluminar a esfera externamente
directionalLight.position.set(worldRadius * 0.5, worldRadius * 1.0, worldRadius * 0.25).normalize().multiplyScalar(worldRadius * 2);
scene.add(directionalLight);
// Adicionar um helper para visualizar a luz (opcional)
// const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 100);
// scene.add(lightHelper);


// 3. Mundo Básico (Issue #3) - Esfera Planetária (Superfície Externa)
const worldGeometry = new THREE.SphereGeometry(worldRadius, 64, 32);
// Material: Renderiza o lado EXTERNO (padrão)
const worldMaterial = new THREE.MeshStandardMaterial({
    color: 0x228B22, // Verde floresta
    // side: THREE.FrontSide // FrontSide é o padrão, não precisa especificar
    // flatShading: true // Para um visual low-poly, se desejado
});
const worldSphere = new THREE.Mesh(worldGeometry, worldMaterial);
// Posição da esfera é a origem (0,0,0)
scene.add(worldSphere);

// --- Função auxiliar para posicionar objetos na superfície da esfera ---
function placeOnSphereSurface(object: THREE.Object3D, positionOnSurface: THREE.Vector3, heightOffset: number = 0) {
    const surfacePoint = positionOnSurface.clone().normalize().multiplyScalar(worldRadius);
    const finalPosition = surfacePoint.clone().add(positionOnSurface.clone().normalize().multiplyScalar(heightOffset));
    object.position.copy(finalPosition);
    // Orientar o objeto: 'up' aponta para fora da esfera
    object.up.copy(positionOnSurface.clone().normalize());
    // Fazer o objeto olhar para um ponto ligeiramente "acima" dele na esfera,
    // ou para o centro (requer rotação adicional talvez). Usar lookAt(0,0,0) pode ser mais simples.
    object.lookAt(new THREE.Vector3(0,0,0)); // Olha para o centro da esfera
    // Corrigir a orientação se necessário (depende do modelo/geometria)
    // Ex: Se lookAt(0,0,0) deixa ele "deitado", rotacionar 90 graus no eixo local X
    // object.rotateX(Math.PI / 2);
}
// ---

// 4. Marcadores Visuais (Issue #3) - Na Superfície
const markerHeight = 10;
const markerHeightOffset = markerHeight / 2; // Para o centro do marcador
const markerGeometry = new THREE.BoxGeometry(markerHeight, markerHeight, markerHeight);

// Marcador 1 (Vermelho) - Ex: No equador, eixo X positivo
const markerMaterial1 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const marker1 = new THREE.Mesh(markerGeometry, markerMaterial1);
const marker1Pos = new THREE.Vector3(worldRadius, 0, 0); // Posição base na superfície
placeOnSphereSurface(marker1, marker1Pos, markerHeightOffset);
scene.add(marker1);

// Marcador 2 (Azul) - Ex: No equador, eixo X negativo
const markerMaterial2 = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const marker2 = new THREE.Mesh(markerGeometry, markerMaterial2);
const marker2Pos = new THREE.Vector3(-worldRadius, 0, 0);
placeOnSphereSurface(marker2, marker2Pos, markerHeightOffset);
scene.add(marker2);

// Marcador 3 (Amarelo) - Ex: No equador, eixo Z positivo
const markerMaterial3 = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const marker3 = new THREE.Mesh(markerGeometry, markerMaterial3);
const marker3Pos = new THREE.Vector3(0, 0, worldRadius);
placeOnSphereSurface(marker3, marker3Pos, markerHeightOffset);
scene.add(marker3);

// 5. Avatar Básico do Jogador (Issue #4) - Na Superfície
const playerRadius = 0.5;
const playerCylinderHeight = 1.0;
const playerTotalHeight = playerCylinderHeight + 2 * playerRadius;
const playerHeightOffset = playerTotalHeight / 2; // Altura do centro da cápsula acima da superfície
const playerGeometry = new THREE.CapsuleGeometry(playerRadius, playerCylinderHeight, 4, 8);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
const playerAvatar = new THREE.Mesh(playerGeometry, playerMaterial);

// Posição inicial do jogador - Ex: Perto do "polo norte" (eixo Y positivo)
const playerInitialSurfacePos = new THREE.Vector3(0, worldRadius, 1); // Posição ligeiramente fora do polo exato para evitar gimbal lock
placeOnSphereSurface(playerAvatar, playerInitialSurfacePos, playerHeightOffset);
// Ajuste fino da orientação da cápsula para ficar "em pé" corretamente
// A cápsula por padrão tem seu eixo longo alinhado com Y.
// Como placeOnSphereSurface já define `up`, ela deve ficar em pé.
// Se ela estiver deitada, pode precisar de: playerAvatar.rotateX(Math.PI / 2);
scene.add(playerAvatar);
console.log('Avatar Básico (Issue #4) adicionado à superfície da esfera.');

// 6. Câmera (Camera) - Fora da Esfera
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
const cameraHeightAboveSurface = 10; // Altura dos "olhos" do jogador acima da superfície
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    worldRadius * 2.5 // Aumentar um pouco o far plane se necessário
);
// Posição inicial da câmera: sobre a posição inicial do jogador, um pouco mais alta
const cameraInitialPosition = playerInitialSurfacePos.clone().normalize()
                               .multiplyScalar(worldRadius + cameraHeightAboveSurface);
camera.position.copy(cameraInitialPosition);
// A câmera deve olhar para um ponto ligeiramente à frente do jogador na superfície
const lookTargetPos = playerInitialSurfacePos.clone().normalize().multiplyScalar(worldRadius - 50); // Olhar um pouco "para baixo" na superfície
lookTargetPos.add(new THREE.Vector3(0, 0, -50).applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), playerInitialSurfacePos.clone().normalize()))); // Adiciona deslocamento local

// Orientar a câmera corretamente (up aponta para fora da esfera)
camera.up.copy(playerInitialSurfacePos.clone().normalize());
camera.lookAt(playerAvatar.position); // Olhar para o avatar inicialmente
scene.add(camera);

// 7. Controles de Teclado/Mouse (Issue #5) - Adaptado para Superfície
const controls = new PointerLockControls(camera, document.body);

const instructions = document.createElement('div');
// Estilização das instruções (igual a antes)...
instructions.style.position = 'absolute';
instructions.style.top = '50%';
instructions.style.left = '50%';
instructions.style.transform = 'translate(-50%, -50%)';
instructions.style.width = 'auto';
instructions.style.padding = '10px 20px';
instructions.style.fontFamily = 'Arial, sans-serif';
instructions.style.fontSize = '16px';
instructions.style.textAlign = 'center';
instructions.style.color = '#ffffff';
instructions.style.backgroundColor = 'rgba(0,0,0,0.7)';
instructions.style.border = '1px solid #ffffff';
instructions.style.borderRadius = '5px';
instructions.style.cursor = 'pointer';
instructions.style.zIndex = '10';
instructions.innerHTML = 'Clique aqui para controlar';
document.body.appendChild(instructions);

const lockPointer = () => { controls.lock(); };
instructions.addEventListener('click', lockPointer);

controls.addEventListener('lock', () => { instructions.style.display = 'none'; });
controls.addEventListener('unlock', () => { instructions.style.display = ''; });

const moveState = { forward: false, backward: false, left: false, right: false };
const moveSpeed = 30.0; // Unidades/segundo (velocidade tangencial na superfície)

const onKeyDown = (event: KeyboardEvent) => { /* ... (igual a antes) ... */
    switch (event.code) {
        case 'ArrowUp': case 'KeyW': moveState.forward = true; break;
        case 'ArrowLeft': case 'KeyA': moveState.left = true; break;
        case 'ArrowDown': case 'KeyS': moveState.backward = true; break;
        case 'ArrowRight': case 'KeyD': moveState.right = true; break;
    }
};
const onKeyUp = (event: KeyboardEvent) => { /* ... (igual a antes) ... */
     switch (event.code) {
        case 'ArrowUp': case 'KeyW': moveState.forward = false; break;
        case 'ArrowLeft': case 'KeyA': moveState.left = false; break;
        case 'ArrowDown': case 'KeyS': moveState.backward = false; break;
        case 'ArrowRight': case 'KeyD': moveState.right = false; break;
    }
};
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// 8. Renderer
const canvas = document.querySelector('#webgl') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 9. Animação (Animation Loop) - Adaptado
const clock = new THREE.Clock();
const direction = new THREE.Vector3();
const cameraDirection = new THREE.Vector3();
const playerUp = new THREE.Vector3(); // Vetor 'up' do jogador (radial)
const tempQuaternion = new THREE.Quaternion();
const tempCameraTarget = new THREE.Vector3();

const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    if (controls.isLocked === true) {
        const cameraObject = controls.getObject();

        // --- Movimento da Câmera ---
        direction.z = Number(moveState.forward) - Number(moveState.backward);
        direction.x = Number(moveState.right) - Number(moveState.left);
        direction.normalize();
        const moveDistance = moveSpeed * delta;

        // Aplica movimento relativo à câmera
        controls.moveForward(direction.z * moveDistance);
        controls.moveRight(direction.x * moveDistance);

        // --- Gravidade Simulada / Manter na Superfície ---
        // Reprojeta a posição da câmera para a altura correta acima da superfície
        const currentPos = cameraObject.position;
        const surfaceNormal = currentPos.clone().normalize(); // Direção radial (para fora)
        const targetPosition = surfaceNormal.multiplyScalar(worldRadius + cameraHeightAboveSurface);
        // Suavizar a transição para a posição correta (opcional, para evitar pulos bruscos)
        // cameraObject.position.lerp(targetPosition, 0.1);
        cameraObject.position.copy(targetPosition); // Correção instantânea

        // --- Orientação da Câmera ---
        // Garante que o 'up' da câmera sempre aponte para fora da esfera
        cameraObject.up.copy(cameraObject.position).normalize();
        // Recalcula para onde a câmera está olhando após a correção de posição/up
        // Precisamos obter a direção atual e aplicá-la a partir da nova posição/orientação
        // Esta parte é complexa com PointerLockControls, pois ele gerencia a rotação internamente.
        // A correção do 'up' pode ser suficiente para manter a orientação correta.


        // --- Atualizar Posição e Rotação do Avatar ---
        playerAvatar.position.copy(surfaceNormal.multiplyScalar(worldRadius + playerHeightOffset)); // Coloca o avatar na superfície abaixo da câmera
        playerAvatar.up.copy(surfaceNormal); // Orienta o 'up' do avatar radialmente

        // Faz o avatar olhar na direção horizontal da câmera
        // 1. Pega a direção que a câmera está olhando
        camera.getWorldDirection(cameraDirection);
        // 2. Cria um quaternion que rotaciona do 'up' global (0,1,0) para o 'up' radial do jogador
        tempQuaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), playerUp.copy(playerAvatar.position).normalize());
        // 3. Aplica essa rotação à direção da câmera para obter a direção no plano tangencial local
        const lookDirectionLocal = cameraDirection.clone().applyQuaternion(tempQuaternion.invert()); // Inverte para mapear de volta
        lookDirectionLocal.y = 0; // Ignora componente vertical local
        lookDirectionLocal.normalize();
        // 4. Desfaz a rotação para obter a direção de look no espaço mundial
        const lookDirectionWorld = lookDirectionLocal.applyQuaternion(tempQuaternion.invert()); // Aplica rotação original de volta
        // 5. Define o ponto para onde olhar
        const lookAtPoint = playerAvatar.position.clone().add(lookDirectionWorld);
        playerAvatar.lookAt(lookAtPoint);

        // Alternativa mais simples para lookAt (pode não ser tão precisa na orientação):
        // tempCameraTarget.copy(cameraObject.position).add(cameraDirection.multiplyScalar(10)); // Ponto à frente da câmera
        // tempCameraTarget.y = playerAvatar.position.y; // Tenta manter horizontal (não funciona bem em esfera)
        // playerAvatar.lookAt(tempCameraTarget);


    } // Fim do if (controls.isLocked)

    renderer.render(scene, camera);
};
animate();


// 10. Responsividade (Window Resize)
window.addEventListener('resize', () => { /* ... (igual a antes) ... */
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Logs finais
console.log('Mundo Básico (Issue #3) corrigido para superfície externa.');
console.log('Avatar Básico (Issue #4) posicionado na superfície.');
console.log('Controles de Teclado/Mouse (Issue #5) adaptados para superfície (com gravidade simulada).');