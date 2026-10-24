(function () {
  const root = document.documentElement;

  function normalizePath(p) {
    if (!p || p === '/' || p === './' || p === '#' || p === 'index.html' || p === '/index.html') return '/';
    return p.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  }

  const currentPath = normalizePath(window.location.pathname);
  const onHomePage = currentPath === '/';

  /* Preloader */
  const preloader = document.getElementById('aaron-preloader');
  if (preloader) {
    root.classList.add('aaron-preloading');

    const syncPreloaderHeight = () => {
      const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      root.style.setProperty('--aaron-vh', `${h}px`);
    };

    syncPreloaderHeight();
    window.addEventListener('resize', syncPreloaderHeight);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', syncPreloaderHeight);
      window.visualViewport.addEventListener('scroll', syncPreloaderHeight);
    }

    const hidePreloader = () => {
      preloader.classList.add('is-hidden');
      root.classList.remove('aaron-preloading');
      root.style.removeProperty('--aaron-vh');
      window.removeEventListener('resize', syncPreloaderHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', syncPreloaderHeight);
        window.visualViewport.removeEventListener('scroll', syncPreloaderHeight);
      }
    };

    if (onHomePage) {
      window.addEventListener('load', () => {
        setTimeout(hidePreloader, 3200);
      });
    } else {
      /* Work/gallery: don't wait for every image — this script is deferred, so the DOM is already ready. */
      setTimeout(hidePreloader, 1300);
    }
  }

  /* Hero statement cycle — advance only when the cycle button is clicked */
  const statements = document.querySelectorAll('.aaron-hero__statements .aaron-hero__statement');
  const cycleBtn = document.querySelector('.aaron-hero__statements .aaron-hero__cycle');

  function showStatement(index) {
    statements.forEach((el, i) => {
      const active = i === index;
      el.classList.toggle('is-active', active);
      if (active) el.removeAttribute('aria-hidden');
      else el.setAttribute('aria-hidden', 'true');
    });

    if (!cycleBtn) return;
    const current = statements[index];
    const tail = current.querySelector('.aaron-hero__statement-tail');
    (tail || current).appendChild(cycleBtn);
  }

  if (statements.length) {
    let index = 0;
    showStatement(0);

    if (cycleBtn && statements.length > 1) {
      cycleBtn.addEventListener('click', () => {
        index = (index + 1) % statements.length;
        showStatement(index);
      });
    }
  }

  /* Start at top on every page load (avoid browser scroll restoration) */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* Nav active state */
  const navItems = document.querySelectorAll('.aaron-nav__item');

  navItems.forEach((item) => {
    const href = item.getAttribute('href') || '';
    const isActive = normalizePath(href) === currentPath;

    item.classList.toggle('is-active', isActive);
    if (isActive) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });

  /* Light / dark theme */
  const THEME_KEY = 'aaron-theme';
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
