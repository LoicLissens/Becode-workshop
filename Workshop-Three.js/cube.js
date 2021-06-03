// Variables
let scene, camera, renderer, material, geometry, mesh, lightTop, lightBottom;

// ! initialisation
const init = () => {
  let canvas = document.querySelector("#c");

  // Configuration renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  canvas = renderer.domElement;
  // Configuration Scene
  scene = new THREE.Scene();

  // Configuration camera
  let fov = 60;
  let aspect = 2;
  let near = 0.1;
  let far = 2000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 1, 20); // (x, y, z)
  camera.lookAt(0, 0, 0);
  // Configuration material
  material = new THREE.MeshToonMaterial({ color: "#ffa41b" });

  //Configuration geometry
  geometry = new THREE.ConeGeometry(20, 20, 99);

  // Configuration mesh et ajout dans la scene
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer.render(scene, camera);
  lightTop = new THREE.DirectionalLight(0xffffff, 1);
  lightTop.position.set(0, 10, 0);
  scene.add(lightTop);

  lightBottom = new THREE.DirectionalLight(0xffffff, 1);
  lightBottom.position.set(0, -10, 0);
  scene.add(lightBottom);
  let control = new THREE.OrbitControls(camera, renderer.domElement);
};
// ! Animation
const animate = () => {
  mesh.rotation.x += 0.1;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

init();
animate();
