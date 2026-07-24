import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


// Scene
const scene = new THREE.Scene();


// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;


// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);


// Load Sun Texture
const loader = new THREE.TextureLoader();

const sunTexture = loader.load(
    "./sun.jpg",

    function(){
        console.log("Sun texture loaded successfully");
    },

    undefined,

    function(){
        console.log("Sun texture failed to load");
    }
);


// Create Sun Ball
const geometry = new THREE.SphereGeometry(
    1.5,
    128,
    128
);


const material = new THREE.MeshStandardMaterial({

    map: sunTexture,

    emissive: new THREE.Color(0xff6600),

    emissiveIntensity: 0.4

});


const sun = new THREE.Mesh(
    geometry,
    material
);


scene.add(sun);


// Sun Light Glow
const light = new THREE.PointLight(
    0xffffff,
    3,
    100
);

light.position.set(
    5,
    3,
    5
);

scene.add(light);


// Camera Mouse Control
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.enableZoom = true;

controls.enablePan = false;


// Animation
function animate(){

    requestAnimationFrame(animate);


    // slow Sun rotation
    sun.rotation.y += 0.002;


    controls.update();


    renderer.render(
        scene,
        camera
    );
}


animate();


// Window resize
window.addEventListener(
    "resize",
    ()=>{

       
        window.innerWidth /
        window.innerHeight;

        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);