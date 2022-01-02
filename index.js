import * as THREE from "./three.js-master/build/three.module.js";
import {GLTFLoader} from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";
import {OrbitControls} from "./three.js-master/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const loader = new GLTFLoader();
var obj, controls;

loader.load(
  "3D/pingu.glb",
  function (glb) {
    glb.castShadow = true;
    obj = glb.scene;
    obj.rotation.x += 1.5;
    console.log(glb);
    const root = glb.scene;
    root.castShadow = true;
    root.scale.set(0.02, 0.02, 0.02);
    scene.add(root);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log("An error occured");
  }
);

//    FLOR
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500, 32),
  new THREE.MeshPhongMaterial({color: 0xffffff})
);
plane.rotation.x = -1;
plane.position.z -= 8;
plane.receiveShadow = true;
//scene.add(plane);

//      Light

const light = new THREE.DirectionalLight(0xffffff, 0.9);
light.position.set(0, 10, 20);
light.castShadow = true;
scene.add(light);

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  100
);
camera.position.set(0, 2, 10);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enableDamping = true;
controls.enablePan = false;
var small = false;
window.addEventListener("resize", resize);
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.updateShadowMap.enabled = true;
renderer.gamaOutput = true;
scene.background = new THREE.Color(0xffffff);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if (window.innerWidth <= 952 && !small) {
    small = true;
    camera.position.set(0, 2, 20);
  } else if (window.innerWidth > 1050 && small) {
    small = false;
    camera.position.set(0, 2, 10);
  }
  controls.update();
}
document.body.appendChild(renderer.domElement);
animate();

// Smooth Scroll

$(document).ready(function () {
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

// Nav Bar

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });
    burger.classList.toggle("toggle");
  });
  nav.addEventListener("click", () => {
    if (window.innerWidth <= 780) {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.5
          }s`;
        }
      });
    }
  });
};

navSlide();
