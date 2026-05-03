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