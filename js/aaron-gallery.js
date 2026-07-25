(function () {
  /* —— Image loading —— */
  function eagerLoadPanel(panel) {
    if (!panel) return;
    panel.querySelectorAll('.aaron-gallery__img').forEach((img) => {
      img.loading = 'eager';
    });
  }

  document.querySelectorAll('.aaron-panel').forEach((panel) => {
    if (panel.classList.contains('is-active')) {
      eagerLoadPanel(panel);
    }
  });

  /* —— Tab groups (section tabs + travel sub-tabs) —— */
  function bindTabGroup(tabSelector, panelSelector, tabAttr, panelAttr) {
    const tabs = document.querySelectorAll(tabSelector);
    const panels = document.querySelectorAll(panelSelector);

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute(tabAttr);

        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        panels.forEach((panel) => {
          const active = panel.getAttribute(panelAttr) === target;
          panel.classList.toggle('is-active', active);
          panel.hidden = !active;
          if (active) eagerLoadPanel(panel);
        });
      });
    });
  }

  bindTabGroup('.aaron-tab', '.aaron-panel', 'data-tab', 'data-panel');
  bindTabGroup('.aaron-subtab', '.aaron-subpanel', 'data-subtab', 'data-subpanel');

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
