import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/Addons.js";

// scene is like a container for 3D objects
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
/* const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true,
}); // Mesh material have color and wireframe parameter */

const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointlight = new THREE.PointLight(0xffffff, 1000);
pointlight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

scene.add(pointlight, ambientLight);

const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);

const lightHelper = new THREE.PointLightHelper(pointlight);
//scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });

  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");

// scene.background = spaceTexture; // #291bc2
const spaceColour = new THREE.Color(0x0d012b);
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

const white = new THREE.Color(0xffffff); //

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ color: white }),
);

scene.add(cube);

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  }),
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

cube.position.z = 5;
cube.position.x = 2;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  cube.position.y += 0.01;
  cube.position.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0003;
}

document.body.onscroll = moveCamera;
animate();

function playMusic() {
  let audioMusic = new Audio("sample-10s.mp3");
  audioMusic.play();
}

playMusic();

/* 
Note : There is one condtion in the google chrome browser that is if you are using the audio file in the project then you have to click on the page first and then only the audio will play. Otherwise it will not play automatically.

If you want to check the code execution , you can check in the vsCode Browser extension . 

*/
