/* ============================================================
   CURSOR
============================================================ */
const cur = document.getElementById('cursor');
const curRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});

(function ringFollow() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  curRing.style.left = rx + 'px';
  curRing.style.top = ry + 'px';
  requestAnimationFrame(ringFollow);
})();

document.querySelectorAll('a,button,.proj-card,.skill-hex,.about-card,.soc-btn,.proj-img-click').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ============================================================
   GLOBAL BG — THREE.JS PARTICLE NEBULA
============================================================ */
(function initBG() {
  const canvas = document.getElementById('bg-canvas');
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  cam.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  // Main cyan particles
  const geo1 = new THREE.BufferGeometry();
  const N1 = 2000;
  const pos1 = new Float32Array(N1 * 3);
  for (let i = 0; i < N1 * 3; i++) pos1[i] = (Math.random() - 0.5) * 10;
  geo1.setAttribute('position', new THREE.BufferAttribute(pos1, 3));
  const mat1 = new THREE.PointsMaterial({ size: 0.012, color: 0x00f5ff, transparent: true, opacity: 0.7 });
  const pts1 = new THREE.Points(geo1, mat1);
  scene.add(pts1);

  // Green particles
  const geo2 = new THREE.BufferGeometry();
  const N2 = 800;
  const pos2 = new Float32Array(N2 * 3);
  for (let i = 0; i < N2 * 3; i++) pos2[i] = (Math.random() - 0.5) * 12;
  geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
  const mat2 = new THREE.PointsMaterial({ size: 0.018, color: 0x00ff88, transparent: true, opacity: 0.4 });
  const pts2 = new THREE.Points(geo2, mat2);
  scene.add(pts2);

  // Purple particles
  const geo3 = new THREE.BufferGeometry();
  const N3 = 600;
  const pos3 = new Float32Array(N3 * 3);
  for (let i = 0; i < N3 * 3; i++) pos3[i] = (Math.random() - 0.5) * 14;
  geo3.setAttribute('position', new THREE.BufferAttribute(pos3, 3));
  const mat3 = new THREE.PointsMaterial({ size: 0.02, color: 0xbf00ff, transparent: true, opacity: 0.3 });
  const pts3 = new THREE.Points(geo3, mat3);
  scene.add(pts3);

  let mx2 = 0, my2 = 0, cx2 = 0, cy2 = 0;
  window.addEventListener('mousemove', e => {
    mx2 = (e.clientX / innerWidth - 0.5) * 2;
    my2 = (e.clientY / innerHeight - 0.5) * 2;
  });

  function bgAnimate() {
    requestAnimationFrame(bgAnimate);
    cx2 += (mx2 - cx2) * 0.02;
    cy2 += (my2 - cy2) * 0.02;
    pts1.rotation.y += 0.0004 + cx2 * 0.002;
    pts1.rotation.x += 0.0002;
    pts2.rotation.y -= 0.0006;
    pts2.rotation.z += 0.0003;
    pts3.rotation.x += 0.0005;
    pts3.rotation.y -= 0.0003 + cy2 * 0.001;
    const t = Date.now() * 0.001;
    mat1.opacity = 0.5 + Math.sin(t * 0.5) * 0.2;
    mat2.opacity = 0.3 + Math.sin(t * 0.7 + 1) * 0.15;
    renderer.render(scene, cam);
  }
  bgAnimate();

  window.addEventListener('resize', () => {
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
})();

/* ============================================================
   HERO — THREE.JS SPINNING TORUS RING
============================================================ */
(function initHero() {
  const canvas = document.getElementById('hero-canvas');
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  cam.position.z = 2.8;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  // Outer torus
  const torusGeo = new THREE.TorusGeometry(1.1, 0.015, 8, 120);
  const torusMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  scene.add(torus);

  // Inner torus
  const torusGeo2 = new THREE.TorusGeometry(0.85, 0.008, 8, 100);
  const torusMat2 = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
  const torus2 = new THREE.Mesh(torusGeo2, torusMat2);
  torus2.rotation.x = Math.PI / 4;
  scene.add(torus2);

  // Outer torus 2
  const torusGeo3 = new THREE.TorusGeometry(1.3, 0.006, 6, 80);
  const torusMat3 = new THREE.MeshBasicMaterial({ color: 0xbf00ff, transparent: true, opacity: 0.6 });
  const torus3 = new THREE.Mesh(torusGeo3, torusMat3);
  torus3.rotation.y = Math.PI / 3;
  scene.add(torus3);

  // Floating particles around ring
  const pGeo = new THREE.BufferGeometry();
  const pN = 200;
  const pPos = new Float32Array(pN * 3);
  for (let i = 0; i < pN; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 1.1 + (Math.random() - 0.5) * 0.3;
    pPos[i * 3] = Math.cos(a) * r;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
    pPos[i * 3 + 2] = Math.sin(a) * r;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.025, color: 0x00f5ff, transparent: true, opacity: 0.8 });
  const pts = new THREE.Points(pGeo, pMat);
  scene.add(pts);

  let heroMX = 0, heroMY = 0, heroCX = 0, heroCY = 0;
  window.addEventListener('mousemove', e => {
    heroMX = (e.clientX / innerWidth - 0.5);
    heroMY = (e.clientY / innerHeight - 0.5);
  });

  function heroAnimate() {
    requestAnimationFrame(heroAnimate);
    heroCX += (heroMX - heroCX) * 0.05;
    heroCY += (heroMY - heroCY) * 0.05;
    const t = Date.now() * 0.001;
    torus.rotation.y = t * 0.4 + heroCX * 0.5;
    torus.rotation.x = heroCY * 0.3;
    torus2.rotation.z = t * 0.3;
    torus2.rotation.x = Math.PI / 4 + heroCY * 0.3;
    torus3.rotation.y = -t * 0.25;
    torus3.rotation.z = t * 0.15;
    pts.rotation.y = t * 0.2;
    pts.rotation.x = Math.sin(t * 0.3) * 0.1;
    renderer.render(scene, cam);
  }
  heroAnimate();
})();

/* ============================================================
   TYPING EFFECT
============================================================ */
const texts = ["Fullstack Developer", "Frontend Engineer", "Creative Developer", "Web Enthusiast"];
let tIdx = 0, cIdx = 0, del = false;
const typEl = document.getElementById('typing');

(function type() {
  const cur = texts[tIdx];
  if (!del) {
    typEl.textContent = cur.slice(0, ++cIdx);
    if (cIdx === cur.length) {
      setTimeout(() => { del = true; type(); }, 1800);
      return;
    }
  } else {
    typEl.textContent = cur.slice(0, --cIdx);
    if (cIdx === 0) {
      del = false;
      tIdx = (tIdx + 1) % texts.length;
    }
  }
  setTimeout(type, del ? 45 : 80);
})();

/* ============================================================
   NAVBAR SCROLL + ACTIVE LINK
============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', scrollY > 50);
  document.getElementById('scrollTopBtn').classList.toggle('show', scrollY > 300);
  updateActive();
});

function updateActive() {
  const secs = document.querySelectorAll('section[id]');
  secs.forEach(s => {
    const top = s.offsetTop - navbar.offsetHeight - 10;
    if (scrollY >= top) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${s.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}

/* ============================================================
   HAMBURGER MENU
============================================================ */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
});

document.querySelectorAll('.ml').forEach(a => {
  a.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
  });
});

/* ============================================================
   SMOOTH SCROLL
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight;
    const start = scrollY;
    const dist = target.getBoundingClientRect().top - offset;
    let st = null;

    (function anim(ct) {
      if (!st) st = ct;
      const elapsed = ct - st, dur = 900;
      const p = elapsed / dur;
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      window.scrollTo(0, start + dist * ease);
      if (elapsed < dur) requestAnimationFrame(anim);
    })(performance.now());
  });
});

/* ============================================================
   REVEAL ON SCROLL
============================================================ */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ============================================================
   IMAGE MODAL
============================================================ */
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');

document.querySelectorAll('.proj-img-click').forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modal.classList.add('open');
  });
});

document.getElementById('modalClose').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

/* ============================================================
   CONTACT FORM — GOOGLE SHEETS
============================================================ */
const scriptURL = 'https://script.google.com/macros/s/AKfycbx57_JuqtY_UYJvrZN3vtlA31PKOtgNQ14Gx7zh0tTNV2zjeIHUQdI9-Q4ZEqHl7jXp/exec';
const form = document.getElementById('contactForm');
const btnK = document.getElementById('btnKirim');
const btnL = document.getElementById('btnLoadingRow');
const alertOk = document.getElementById('alertOk');

form.addEventListener('submit', e => {
  e.preventDefault();
  btnK.style.display = 'none';
  btnL.style.display = 'flex';

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(r => r.json())
    .then(() => {
      alertOk.classList.add('show');
      btnL.style.display = 'none';
      btnK.style.display = 'flex';
      form.reset();
      setTimeout(() => alertOk.classList.remove('show'), 5000);
    })
    .catch(err => {
      console.error('Error:', err);
      btnL.style.display = 'none';
      btnK.style.display = 'flex';
    });
});

/* ============================================================
   3D CARD TILT — PROJECT CARDS
============================================================ */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-10px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    card.style.transition = 'transform 0.05s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    card.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
  });
});