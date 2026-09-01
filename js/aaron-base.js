(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const onHomePage = path === '' || path === 'index.html';

  /* Preloader */
  const preloader = document.getElementById('aaron-preloader');
  if (preloader) {
    const hidePreloader = () => preloader.classList.add('is-hidden');

    if (onHomePage) {
      window.addEventListener('load', () => {
        setTimeout(hidePreloader, 3200);
      });
    } else {
      /* Work/gallery: don't wait for every image — this script is deferred, so the DOM is already ready. */
      setTimeout(hidePreloader, 1300);
    }
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

  /* Start at top on every page load (avoid browser scroll restoration) */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

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

  /* Light / dark theme */
  const THEME_KEY = 'aaron-theme';
  const root = document.documentElement;
  const themeToggle = document.querySelector('.aaron-theme-toggle');

  function getTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function syncThemeToggle(theme) {
    if (!themeToggle) return;
    const next = theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${next} mode`);
    themeToggle.title = next === 'dark' ? 'Dark mode' : 'Light mode';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) { /* ignore quota / private mode */ }
    syncThemeToggle(theme);
  }

  syncThemeToggle(getTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  }
})();
