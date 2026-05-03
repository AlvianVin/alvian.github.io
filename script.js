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