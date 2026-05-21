// scrooll smooth
const links = document.querySelectorAll('.nav-link, .navbar-brand');
const navbar = document.querySelector('.navbar');
const navbarCollapse = document.querySelector('.navbar-collapse');

function smoothScroll(targetPosition, duration = 800) {
  const start = window.pageYOffset;
  const distance = targetPosition - start;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    // easing (biar halus)
    const ease = timeElapsed / duration;
    const easeInOut = ease < 0.5
      ? 2 * ease * ease
      : 1 - Math.pow(-2 * ease + 2, 2) / 2;

    window.scrollTo(0, start + distance * easeInOut);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// animasi ketik
const texts = ["ALVIAN", "fullstack developer"];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;
let typingStopped = false;

// Ambil elemen & buat kursor
const typingEl = document.getElementById("typing");
const cursor = document.createElement("span");
cursor.textContent = "|";
cursor.style.fontWeight = "bold";
cursor.style.marginLeft = "5px";
cursor.style.color = "#fff";
cursor.style.animation = "blink 0.7s steps(1) infinite";
typingEl.appendChild(cursor);

// Tambahkan animasi blink
const style = document.createElement("style");
style.textContent = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
document.head.appendChild(style);

// Fungsi utama ketik
function type() {
  if (typingStopped) return;

  currentText = texts[count];

  if (!isDeleting) {
    letter = currentText.slice(0, ++index);
    typingEl.textContent = letter;
    typingEl.appendChild(cursor);

    if (letter.length === currentText.length) {
      // Setelah selesai ngetik, tunggu lalu lanjut ke teks berikutnya
      setTimeout(() => {
        index = 0;
        count = (count + 1) % texts.length;
        type();
      }, 1500);
    } else {
      setTimeout(type, 100);
    }
  }
}

// Fungsi hapus saat Backspace
function deleteText() {
  if (index >= 0) {
    letter = currentText.slice(0, index--);
    typingEl.textContent = letter;
    typingEl.appendChild(cursor);
    setTimeout(deleteText, 50);
  } else {
    typingStopped = true;
  }
}

// Mulai ketik
type();

// Cek tombol Backspace
document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" && !isDeleting) {
    isDeleting = true;
    typingStopped = true;
    deleteText();
  }
});


// document.getElementById('about').addEventListener('click', function() {
//   window.location.href = 'about.html';
// });


// contact message googlesheets
links.forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');

    if (targetId && targetId.startsWith('#')) {
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        const navbarHeight = navbar.offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        smoothScroll(targetPosition, 800); // bisa ubah durasi

        // auto close navbar mobile
        if (navbarCollapse.classList.contains('show')) {
          new bootstrap.Collapse(navbarCollapse).hide();
        }
      }
    }
  });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbx57_JuqtY_UYJvrZN3vtlA31PKOtgNQ14Gx7zh0tTNV2zjeIHUQdI9-Q4ZEqHl7jXp/exec'
const form = document.forms['contact-message-portfolio']
const btnKirim = document.querySelector('.btn-kirim');
const btnLoading = document.querySelector('.btn-loading');
const myAlert  = document.querySelector('.myAlert')

form.addEventListener('submit', e => {
	e.preventDefault()
  // ketika tombol submit di klik
  // tampilkan btn-loading, hilangkan tombol kirim
  btnLoading.classList.toggle('d-none');
  btnKirim.classList.toggle('d-none');
	fetch(scriptURL, { method: 'POST', body: new FormData(form) })
		.then(response => response.json())
		.then(response => {
      console.log('Success!', response)
      // tampolkan alert
      myAlert.classList.toggle('d-none');
      // tampilkan btn-kirim, hilangkan tombol loading
      btnLoading.classList.toggle('d-none');
      btnKirim.classList.toggle('d-none');
      // reset form nya
      form.reset();
    })
		.catch(error => console.error('Error!', error.message))
})