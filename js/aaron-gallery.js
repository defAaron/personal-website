(function () {
  /* —— Lazy-load fade-in —— */
  function markLoaded(img) {
    img.classList.add('is-loaded');
  }

  function initFadeIn(scope) {
    const imgs = (scope || document).querySelectorAll('.aaron-gallery__img:not(.is-bound)');
    imgs.forEach((img) => {
      img.classList.add('is-bound');
      if (img.complete && img.naturalWidth > 0) {
        markLoaded(img);
      } else {
        img.addEventListener('load', () => markLoaded(img), { once: true });
        img.addEventListener('error', () => markLoaded(img), { once: true });
      }
    });
  }

  initFadeIn(document);

  /* —— Section tabs —— */
  const tabs = document.querySelectorAll('.aaron-tab');
  const panels = document.querySelectorAll('.aaron-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      panels.forEach((panel) => {
        const active = panel.dataset.panel === target;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
        if (active) initFadeIn(panel);
      });
    });
  });

  /* —— Travel sub-tabs —— */
  const subtabs = document.querySelectorAll('.aaron-subtab');
  const subpanels = document.querySelectorAll('.aaron-subpanel');

  subtabs.forEach((subtab) => {
    subtab.addEventListener('click', () => {
      const target = subtab.dataset.subtab;

      subtabs.forEach((t) => {
        const active = t === subtab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      subpanels.forEach((panel) => {
        const active = panel.dataset.subpanel === target;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
        if (active) initFadeIn(panel);
      });
    });
  });

  /* —— Lightbox —— */
  const lightbox = document.getElementById('aaron-lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.aaron-lightbox__img');
  const closeBtn = lightbox.querySelector('.aaron-lightbox__close');
  const prevBtn = lightbox.querySelector('.aaron-lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.aaron-lightbox__nav--next');

  let currentGroup = [];
  let currentIndex = 0;

  function visibleImages() {
    return Array.from(document.querySelectorAll('.aaron-gallery__img')).filter((img) => {
      return img.offsetParent !== null;
    });
  }

  function show(index) {
    if (index < 0) index = currentGroup.length - 1;
    if (index >= currentGroup.length) index = 0;
    currentIndex = index;
    const img = currentGroup[index];
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
  }

  function openLightbox(img) {
    currentGroup = visibleImages();
    currentIndex = currentGroup.indexOf(img);
    if (currentIndex === -1) currentIndex = 0;
    show(currentIndex);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const img = e.target.closest('.aaron-gallery__img');
    if (img) openLightbox(img);
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => show(currentIndex - 1));
  nextBtn.addEventListener('click', () => show(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') show(currentIndex - 1);
    else if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
})();
