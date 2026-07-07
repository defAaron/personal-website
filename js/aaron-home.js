(function () {
  /* Preloader */
  const preloader = document.getElementById('aaron-preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('is-hidden'), 3200);
    });
  }

  /* Hero statement cycle — rotating lines only */
  const statements = document.querySelectorAll('.aaron-hero__statements .aaron-hero__statement');
  if (statements.length > 1) {
    let index = 0;
    statements[0].classList.add('is-active');

    setInterval(() => {
      statements[index].classList.remove('is-active');
      index = (index + 1) % statements.length;
      statements[index].classList.add('is-active');
    }, 3500);
  } else if (statements.length === 1) {
    statements[0].classList.add('is-active');
  }

  /* Sticky name bar on scroll */
  const navInfo = document.getElementById('aaron-nav-info');
  const hero = document.querySelector('.aaron-tile--xl');

  if (navInfo && hero) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        navInfo.classList.toggle('is-visible', !entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(hero);
  }

  /* Nav active state */
  const navItems = document.querySelectorAll('.aaron-nav__item');
  navItems.forEach((item) => {
    if (item.getAttribute('href') === '#' || item.getAttribute('href') === 'index.html') {
      item.classList.add('is-active');
    }
  });
})();
