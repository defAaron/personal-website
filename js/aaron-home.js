(function () {
  /* Preloader */
  const preloader = document.getElementById('aaron-preloader');
  if (preloader) {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const onHomePage = path === '' || path === 'index.html';
    const preloaderDelay = onHomePage ? 3200 : 2200;

    const hidePreloader = () => preloader.classList.add('is-hidden');

    window.addEventListener('load', () => {
      setTimeout(hidePreloader, preloaderDelay);
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

  /* Keep home page scrolled to top on mobile (dock init used to scroll the page) */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const onHomePage = path === '' || path === 'index.html';

  if (onHomePage) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }

  /* Nav active state */
  const navItems = document.querySelectorAll('.aaron-nav__item');

  navItems.forEach((item) => {
    const href = item.getAttribute('href') || '';
    const isHomeLink = href === '#' || href === './' || href === '/' || href === 'index.html';
    const isActive =
      href === path ||
      (onHomePage && isHomeLink && item.textContent.trim().toLowerCase() === 'home');

    item.classList.toggle('is-active', isActive);
    if (isActive) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });
})();
