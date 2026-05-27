// =========================
// AOS
// =========================

AOS.init({
  once: true,
  duration: 900
});

// =========================
// TYPING EFFECT
// =========================

const typing = document.getElementById("typing");

const texts = [
  "ALVIAN",
  "Fullstack Developer",
  "Frontend Engineer",
  "Creative Developer"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {

  if (count === texts.length) {
    count = 0;
  }

  currentText = texts[count];

  letter = currentText.slice(0, ++index);

  typing.textContent = letter;

  if (letter.length === currentText.length) {

    setTimeout(() => {

      count++;
      index = 0;

      type();

    }, 1800);

  } else {

    setTimeout(type, 90);

  }

})();

// =========================
// NAVBAR SCROLL
// =========================

window.addEventListener("scroll", () => {

  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {

    navbar.style.background = "rgba(5,8,22,.95)";

  } else {

    navbar.style.background = "rgba(5,8,22,.7)";

  }

});

// =========================
// SCROLL TOP
// =========================

const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {

    scrollTop.classList.add("show");

  } else {

    scrollTop.classList.remove("show");

  }

});

// =========================
// IMAGE MODAL
// =========================

const projectImages =
  document.querySelectorAll(".project-image");

const modalImage =
  document.getElementById("modalImage");

projectImages.forEach(img => {

  img.addEventListener("click", () => {

    modalImage.src = img.src;

    const imageModal =
      new bootstrap.Modal(
        document.getElementById("imageModal")
      );

    imageModal.show();

  });

});

// =========================
// CONTACT FORM
// =========================

const scriptURL =
  'https://script.google.com/macros/s/AKfycbx57_JuqtY_UYJvrZN3vtlA31PKOtgNQ14Gx7zh0tTNV2zjeIHUQdI9-Q4ZEqHl7jXp/exec'

const form =
  document.forms['contact-message-portfolio'];

const btnKirim =
  document.querySelector('.btn-kirim');

const btnLoading =
  document.querySelector('.btn-loading');

const myAlert =
  document.querySelector('.myAlert');

form.addEventListener('submit', e => {

  e.preventDefault();

  btnLoading.classList.toggle('d-none');

  btnKirim.classList.toggle('d-none');

  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form)
  })

    .then(response => response.json())

    .then(response => {

      myAlert.classList.toggle('d-none');

      btnLoading.classList.toggle('d-none');

      btnKirim.classList.toggle('d-none');

      form.reset();

    })

    .catch(error => console.error('Error!', error.message))

});

// =========================

// =========================
// THREE JS BACKGROUND
// =========================

const canvas = document.getElementById("bg-canvas");

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// PARTICLES GEOMETRY
const particlesGeometry = new THREE.BufferGeometry();

const particlesCount = 1200;

const positions = new Float32Array(
  particlesCount * 3
);

// RANDOM POSITION
for (let i = 0; i < particlesCount * 3; i++) {

  positions[i] = (Math.random() - 0.5) * 8;

}

// SET ATTRIBUTE
particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);

// MATERIAL
const particlesMaterial = new THREE.PointsMaterial({

  size: 0.015,

  color: "#3b82f6",

  transparent: true,

  opacity: 0.8

});

// PARTICLES
const particlesMesh = new THREE.Points(
  particlesGeometry,
  particlesMaterial
);

// ADD TO SCENE
scene.add(particlesMesh);

// CAMERA POSITION
camera.position.z = 3;

// =========================
// SMOOTH MOUSE EFFECT
// =========================

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

// mouse position
window.addEventListener("mousemove", (event) => {

  mouseX =
    (event.clientX / window.innerWidth - 0.5) * 2;

  mouseY =
    (event.clientY / window.innerHeight - 0.5) * 2;

});

// animation
function animateParticles() {

  requestAnimationFrame(animateParticles);

  // smooth follow
  currentX += (mouseX - currentX) * 0.03;

  currentY += (mouseY - currentY) * 0.03;

  // AUTO FLOAT
  particlesMesh.rotation.y += 0.001;

  // CURSOR INFLUENCE
  particlesMesh.rotation.x = currentY * 0.001;

  particlesMesh.rotation.y += currentX * 0.006;

  renderer.render(scene, camera);

}

animateParticles();

animateParticles();

// RESPONSIVE
window.addEventListener("resize", () => {

  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

});