'use strict';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/GLTFLoader.js';


let camera, scene, renderer;
let geometry, material, controls;

init();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color("rgb(0, 150, 255)");

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add cube with edge line 
    // geometry = new THREE.BoxGeometry(1, 1, 1);
    // const edges = new THREE.EdgesGeometry(geometry);
    // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
    // material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    
    // const cube = new THREE.Mesh(geometry, material);
    // cube.add(line)
    // scene.add(cube);
    
    camera.position.z = 5;

    const loader = new GLTFLoader();

    let obj;
    loader.load('https://github.com/iGreenapple/diplomka/blob/main/Vulcano.gltf',
        function (gltf) {
            obj = gltf.scene;
            scene.add(gltf.scene);
        });

    const light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
    scene.add(light);




    controls = new OrbitControls(camera, renderer.domElement);
    // camera.position.set(0, 20, 100);
    // controls.update();
    // controls.addEventListener('change', renderer);

    function animate() {
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    }
    animate()



}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // Updates the camera projection matrix. Must be called after any change of parameters.
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false) //event listener na změnu velikosti okna → zavolá funkci, která upraví nastavení kamery

// animate()
