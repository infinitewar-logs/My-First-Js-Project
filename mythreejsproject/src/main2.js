import * as THREE from "three";

// 1. Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Define Animation Variables
let currentThetaLength = 0;
const maxThetaLength = Math.PI * 2; // Full circle ($2\pi$)
const speed = 0.02; // How fast the fan opens
const radius = 2;
const segments = 32;

// 3. Create initial Mesh with 0 thetaLength
let geometry = new THREE.CircleGeometry(
  radius,
  segments,
  0,
  currentThetaLength,
);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0055,
  side: THREE.DoubleSide,
});
const fanMesh = new THREE.Mesh(geometry, material);
scene.add(fanMesh);

// 4. The Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Increment thetaLength to make it "unfold"
  if (currentThetaLength < maxThetaLength) {
    currentThetaLength += speed;

    // CRITICAL: Clean up old geometry from GPU memory to prevent memory leaks
    fanMesh.geometry.dispose();

    // Create new geometry with updated thetaLength and assign it
    fanMesh.geometry = new THREE.CircleGeometry(
      radius,
      segments,
      0,
      currentThetaLength,
    );
  } else {
    // Optional: Reset animation once it's a full circle to loop it
    currentThetaLength = 0;
  }

  // Optional: Add a bit of rotation so it spins like a mechanical fan while opening
  fanMesh.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
