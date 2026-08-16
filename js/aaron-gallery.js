(function () {
  /* —— Image loading —— */
  function eagerLoadPanel(panel) {
    if (!panel) return;
    panel.querySelectorAll('.aaron-gallery__img').forEach((img) => {
      img.loading = 'eager';
    });
  }

  const ALBUM_LABELS = {
    auckland: 'Auckland Workshop',
    drawings: 'Drawings',
    piano: 'Piano',
    travel: 'Travel',
  };

  const COUNTRY_LABELS = {
    canada: 'Canada',
    spain: 'Spain',
    france: 'France',
    italy: 'Italy',
    austria: 'Austria',
    switzerland: 'Switzerland',
  };

  const TRAVEL_FEATURES = {
    canada: { src: 'assets/gallery/travel/canada/nb.webp', alt: 'New Brunswick, Canada' },
    spain: { src: 'assets/gallery/travel/spain/spain1.webp', alt: 'Spain' },
    france: { src: 'assets/gallery/travel/france/france1.webp', alt: 'France' },
    italy: { src: 'assets/gallery/travel/italy/italy1.webp', alt: 'Italy' },
    austria: { src: 'assets/gallery/travel/austria/aus1.webp', alt: 'Austria' },
    switzerland: { src: 'assets/gallery/travel/switzerland/swiss1.webp', alt: 'Switzerland' },
  };

  function initFades() {
    const fades = Array.from(document.querySelectorAll('.aaron-fade'));

    fades.forEach((el) => {
      const slides = Array.from(el.querySelectorAll('.aaron-fade__img'));
      if (slides.length < 2) return;

      let index = Math.max(0, slides.findIndex((img) => img.classList.contains('is-active')));

      function show(next) {
        slides[index].classList.remove('is-active');
        index = (next + slides.length) % slides.length;
        slides[index].classList.add('is-active');
      }

      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', 'Next photo');

      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        show(index + 1);
      });

      el.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        show(index + 1);
      });
    });
  }

  function initPhone() {
    const phone = document.getElementById('aaron-phone');
    const tile = document.getElementById('aaron-phone-tile');
    const dock = document.getElementById('aaron-photos-dock');
    const indicator = document.getElementById('aaron-photos-indicator');
    const heading = document.getElementById('aaron-photos-heading');
    const backBtn = document.getElementById('aaron-photos-back');
    const cursor = document.getElementById('aaron-phone-cursor');
    if (!phone || !tile || !dock || !indicator) return;

    const buttons = Array.from(dock.querySelectorAll('.aaron-photos__dock-btn'));
    const albums = Array.from(phone.querySelectorAll('.aaron-photos__album'));
    const travelAlbum = phone.querySelector('.aaron-photos__album[data-album="travel"]');
    const travelCal = travelAlbum && travelAlbum.querySelector('.aaron-travel-cal');
    const travelCountries = travelAlbum
      ? Array.from(travelAlbum.querySelectorAll('.aaron-travel-country'))
      : [];
    const travelFeature = document.getElementById('aaron-travel-feature');

    function setTravelFeature(id) {
      if (!travelFeature) return;
      const feat = id && TRAVEL_FEATURES[id];
      if (feat) {
        travelFeature.src = feat.src;
        travelFeature.alt = feat.alt;
        return;
      }
      travelFeature.src = travelFeature.getAttribute('data-feature-default') || travelFeature.src;
      travelFeature.alt = travelFeature.getAttribute('data-feature-alt') || 'Travel';
    }

    function showTravelCalendar() {
      phone.classList.add('is-calendar');
      if (travelCal) travelCal.hidden = false;
      travelCountries.forEach((view) => {
        view.classList.remove('is-active');
        view.hidden = true;
      });
      if (backBtn) backBtn.hidden = true;
      if (heading) heading.textContent = ALBUM_LABELS.travel;
      setTravelFeature(null);
    }

    function openTravelCountry(id) {
      const view = travelCountries.find((el) => el.getAttribute('data-country') === id);
      if (!view) return;
      phone.classList.remove('is-calendar');
      if (travelCal) travelCal.hidden = true;
      travelCountries.forEach((el) => {
        const on = el === view;
        el.classList.toggle('is-active', on);
        el.hidden = !on;
        if (on) eagerLoadPanel(el);
      });
      if (backBtn) backBtn.hidden = false;
      if (heading) heading.textContent = COUNTRY_LABELS[id] || id;
      setTravelFeature(id);
    }

    if (travelAlbum) {
      travelAlbum.addEventListener('click', (e) => {
        const row = e.target.closest('[data-country]');
        if (!row || !travelCal || travelCal.hidden) return;
        openTravelCountry(row.getAttribute('data-country'));
      });
      travelAlbum.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const row = e.target.closest('.aaron-phone__event[data-country]');
        if (!row || !travelCal || travelCal.hidden) return;
        e.preventDefault();
        openTravelCountry(row.getAttribute('data-country'));
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showTravelCalendar();
      });
    }

    function moveIndicator(btn) {
      const left = btn.offsetLeft + (btn.offsetWidth - indicator.offsetWidth) / 2;
      indicator.style.left = `${Math.round(left)}px`;
    }

    function selectAlbum(id) {
      const btn = buttons.find((b) => b.dataset.album === id);
      if (!btn) return;

      buttons.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      albums.forEach((album) => {
        const on = album.getAttribute('data-album') === id;
        album.classList.toggle('is-active', on);
        album.hidden = !on;
        if (on && id !== 'travel') eagerLoadPanel(album);
      });

      document.querySelectorAll('.aaron-panel').forEach((panel) => {
        const on = panel.getAttribute('data-panel') === id;
        panel.classList.toggle('is-active', on);
        panel.hidden = !on;
        if (on) eagerLoadPanel(panel);
      });

      if (id === 'travel') {
        showTravelCalendar();
      } else {
        phone.classList.remove('is-calendar');
        if (backBtn) backBtn.hidden = true;
        if (heading) heading.textContent = ALBUM_LABELS[id] || '';
      }
      moveIndicator(btn);
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => selectAlbum(btn.dataset.album));
    });

    selectAlbum('auckland');
    window.addEventListener('load', () => {
      const active = dock.querySelector('.aaron-photos__dock-btn.is-active');
      if (active) moveIndicator(active);
    });
    window.addEventListener('resize', () => {
      const active = dock.querySelector('.aaron-photos__dock-btn.is-active');
      if (active) moveIndicator(active);
    });

    tile.addEventListener('mouseenter', () => {
      tile.classList.add('is-hovering');
    });
    tile.addEventListener('mouseleave', () => {
      tile.classList.remove('is-hovering', 'is-cursor');
    });

    if (cursor) {
      tile.addEventListener('mousemove', (e) => {
        const overPhone = !!e.target.closest('.aaron-phone');
        tile.classList.toggle('is-cursor', overPhone);
        if (!overPhone) return;
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    }

    const timeEl = document.getElementById('aaron-phone-time');
    if (timeEl) {
      const timeFmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      function estTime() {
        return timeFmt.format(new Date()).replace(/\s*[AP]M$/i, '');
      }

      function tick() {
        const next = estTime();
        if (timeEl.textContent !== next) timeEl.textContent = next;
      }

      tick();
      setInterval(tick, 1000);
    }
  }

  initFades();
  initPhone();

  document.querySelectorAll('.aaron-panel').forEach((panel) => {
    if (panel.classList.contains('is-active')) {
      eagerLoadPanel(panel);
    }
  });

  /* —— Travel country sub-tabs —— */
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

  bindTabGroup('.aaron-subtab', '.aaron-subpanel', 'data-subtab', 'data-subpanel');
})();
