/**
 * cmd-dock + tilda-bar (inspired by marco.fyi)
 */
(function () {
  const mount = document.getElementById('mac-dock');
  if (!mount) return;

  const APPS = [
    {
      id: 'arc',
      name: 'Arc',
      icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62c8b436355950582b0f0695_arc-logo.webp',
      accent: '#fc5c54',
      accentBg: '#ffe8e6',
      tabActiveBg: '#fff0ef',
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62c906ccc50496194ba8ac88_Notion.webp',
      accent: '#6366f1',
      accentBg: '#dbddff',
      tabActiveBg: '#eff0ff',
    },
    {
      id: 'cursor',
      name: 'Cursor',
      icon: 'assets/dock/cursor.png',
      accent: '#6366f1',
      accentBg: '#e8eafc',
      tabActiveBg: '#eff0ff',
    },
    {
      id: 'figma',
      name: 'Figma',
      icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62c909916f6892fbf32c42dc_figma.webp',
      accent: '#a259ff',
      accentBg: '#ede5ff',
      tabActiveBg: '#f5f0ff',
    },
    {
      id: 'claude',
      name: 'Claude',
      icon: 'assets/dock/claude.png',
      accent: '#d97757',
      accentBg: '#fdeee8',
      tabActiveBg: '#fff5f0',
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: 'assets/dock/spotify.svg',
      accent: '#1ed760',
      accentBg: '#dcfce7',
      tabActiveBg: '#ecfdf3',
    },
  ];

  const APP_TABS = {
    arc: [
      { id: 'arc-1', title: 'Aaron Dutta', subtitle: 'aarondutta.com', emoji: '👤', href: 'https://aarondutta.com', external: true },
      { id: 'arc-2', title: 'LinkedIn', subtitle: 'linkedin.com/in/aaron-dutta', icon: 'assets/dock/linkedin.svg', href: 'https://linkedin.com/in/aaron-dutta', external: true },
      { id: 'arc-3', title: 'GitHub', subtitle: 'github.com/defAaron', icon: 'assets/dock/github.svg', href: 'https://github.com/defAaron', external: true },
      { id: 'arc-4', title: 'YouTube', subtitle: 'youtube.com/@aaron_dutta', icon: 'assets/dock/youtube.svg', href: 'https://youtube.com/@aaron_dutta', external: true },
    ],
    notion: [
      { id: 'notion-1', title: 'TechniqueTitan Notes', subtitle: "Aaron's Workspace", emoji: '📝', href: '#', external: false },
      { id: 'notion-2', title: 'Best Quotes by Mathematicians', subtitle: "Aaron's Workspace", emoji: '💬', href: '#', external: false },
      { id: 'notion-3', title: 'To-Do List', subtitle: "Aaron's Workspace", emoji: '✅', href: '#', external: false },
      { id: 'notion-4', title: 'Reads', subtitle: "Aaron's Workspace", emoji: '📚', href: '#', external: false },
    ],
    figma: [
      { id: 'figma-1', title: 'Personal Website', subtitle: 'figma.com/personal-website', emoji: '✦', href: '#', external: false },
      { id: 'figma-2', title: 'Personal Website 2.0', subtitle: 'figma.com/personal-website-2-0', emoji: '✦', href: '#', external: false },
      { id: 'figma-3', title: 'Design Sesh', subtitle: 'figma.com/design-sesh', emoji: '🎨', href: '#', external: false },
      { id: 'figma-4', title: 'Colour Palettes', subtitle: 'figma.com/colour-palettes', emoji: '🎨', href: '#', external: false },
    ],
    cursor: [
      { id: 'cursor-1', title: 'FraudGen', subtitle: 'defAaron', emoji: '📁', href: '#', external: false },
      { id: 'cursor-2', title: 'Mycellium', subtitle: 'defAaron', emoji: '📁', href: '#', external: false },
      { id: 'cursor-3', title: 'TechniqueTitan', subtitle: 'defAaron', emoji: '📁', href: '#', external: false },
      { id: 'cursor-4', title: 'Personal Website', subtitle: 'defAaron', emoji: '📁', href: '#', external: false },
    ],
    spotify: [
      { id: 'spotify-1', title: 'God Was Showing Off', subtitle: 'Bruno Mars', emoji: '🎵', href: '#', external: false },
      { id: 'spotify-2', title: 'Thinkin Bout You', subtitle: 'Frank Ocean', emoji: '🎵', href: '#', external: false },
      { id: 'spotify-3', title: 'Piano Concerto No. 2 in C Minor, Op. 18: II. Adagio sostenuto', subtitle: 'Sergei Rachmaninoff', emoji: '🎹', href: '#', external: false },
    ],
    claude: [
      { id: 'claude-1', title: 'hey claude, print my resume', subtitle: 'Resume.pdf', emoji: '💬', href: 'assets/Resume.pdf', external: true },
    ],
  };

  let activeAppId = 'arc';
  let activeTabId = APP_TABS.arc[0].id;

  const shell = document.createElement('div');
  shell.className = 'mac-dock-shell';

  const tabPanel = document.createElement('div');
  tabPanel.className = 'mac-dock-tabs is-visible';
  tabPanel.setAttribute('role', 'region');
  tabPanel.setAttribute('aria-label', 'Open tabs');

  const tabHeader = document.createElement('div');
  tabHeader.className = 'mac-dock-tabs__header';

  const tabRow = document.createElement('div');
  tabRow.className = 'mac-dock-tabs__row';
  tabRow.setAttribute('role', 'tablist');

  const tabCaret = document.createElement('div');
  tabCaret.className = 'mac-dock-tabs__caret';
  tabCaret.setAttribute('aria-hidden', 'true');
  tabCaret.innerHTML =
    '<svg width="34" height="14" viewBox="0 0 34 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 14L0 0h34L17 14z" fill="#fff" stroke="#cccccf" stroke-width="1"/></svg>';

  tabPanel.append(tabHeader, tabRow, tabCaret);

  const dock = document.createElement('div');
  dock.className = 'mac-dock';
  dock.setAttribute('role', 'toolbar');
  dock.setAttribute('aria-label', 'Application dock');

  const iconStrip = document.createElement('div');
  iconStrip.className = 'mac-dock__icons';
  dock.appendChild(iconStrip);

  shell.append(tabPanel, dock);
  mount.appendChild(shell);

  const iconEls = APPS.map((app) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mac-dock__icon';
    if (app.round) btn.classList.add('mac-dock__icon--round');
    btn.dataset.appId = app.id;
    btn.title = app.name;
    btn.setAttribute('aria-label', app.name);
    btn.style.setProperty('--app-accent', app.accent);
    btn.style.setProperty('--app-accent-bg', app.accentBg);

    const ring = document.createElement('span');
    ring.className = 'mac-dock__ring';
    ring.hidden = true;

    const hover = document.createElement('span');
    hover.className = 'mac-dock__hover';
    hover.setAttribute('aria-hidden', 'true');

    const img = document.createElement('img');
    img.src = app.icon;
    img.alt = '';
    img.width = 64;
    img.height = 64;
    img.draggable = false;
    img.loading = 'lazy';

    const dot = document.createElement('span');
    dot.className = 'mac-dock__indicator';
    dot.hidden = app.id !== activeAppId;

    btn.append(ring, hover, img, dot);
    btn.addEventListener('click', () => selectApp(app.id));
    iconStrip.appendChild(btn);

    return { btn, ring, app };
  });

  tabRow.addEventListener(
    'wheel',
    (e) => {
      if (tabRow.scrollWidth <= tabRow.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      tabRow.scrollLeft += e.deltaY;
    },
    { passive: false }
  );

  function getActiveApp() {
    return APPS.find((a) => a.id === activeAppId);
  }

  function applyAccentVars() {
    const app = getActiveApp();
    if (!app) return;
    tabPanel.style.setProperty('--app-accent', app.accent);
    tabPanel.style.setProperty('--app-tab-active-bg', app.tabActiveBg);
  }

  function updateCaretPosition() {
    const activeIndex = APPS.findIndex((a) => a.id === activeAppId);
    if (activeIndex < 0) return;

    const panelRect = tabPanel.getBoundingClientRect();
    const iconRect = iconEls[activeIndex].btn.getBoundingClientRect();
    const iconCenter = iconRect.left + iconRect.width / 2 - panelRect.left;

    tabCaret.style.left = `${iconCenter}px`;
  }

  function updateActiveIconStyles() {
    iconEls.forEach((entry) => {
      const isActive = entry.app.id === activeAppId;
      entry.btn.classList.toggle('is-active', isActive);
      entry.ring.hidden = !isActive;
      entry.btn.querySelector('.mac-dock__indicator').hidden = !isActive;
    });
    updateCaretPosition();
  }

  function updateAppHeader() {
    const app = getActiveApp();
    if (!app) {
      tabHeader.innerHTML = '';
      return;
    }

    tabHeader.innerHTML =
      `<img class="mac-dock-tabs__header-icon" src="${app.icon}" alt="" width="18" height="18" draggable="false">` +
      `<span class="mac-dock-tabs__header-name">${app.name}</span>`;
  }

  function renderTabIcon(tab) {
    if (tab.icon) {
      return `<img class="mac-dock-tab__icon-img" src="${tab.icon}" alt="" width="16" height="16" draggable="false">`;
    }
    return tab.emoji || '';
  }

  function scrollActiveTabIntoView() {
    const activeCard = tabRow.querySelector('.mac-dock-tab.is-active');
    if (!activeCard || tabRow.scrollWidth <= tabRow.clientWidth) return;

    const cardLeft = activeCard.offsetLeft;
    const cardRight = cardLeft + activeCard.offsetWidth;
    const viewLeft = tabRow.scrollLeft;
    const viewRight = viewLeft + tabRow.clientWidth;

    if (cardLeft < viewLeft) {
      tabRow.scrollLeft = cardLeft;
    } else if (cardRight > viewRight) {
      tabRow.scrollLeft = cardRight - tabRow.clientWidth;
    }
  }

  function renderTabPanel() {
    const tabs = APP_TABS[activeAppId] || [];
    applyAccentVars();
    updateAppHeader();
    tabRow.innerHTML = '';

    tabs.forEach((tab) => {
      const card = document.createElement('a');
      card.className = 'mac-dock-tab';
      card.href = tab.href;
      card.setAttribute('role', 'tab');
      card.setAttribute('aria-selected', tab.id === activeTabId ? 'true' : 'false');

      if (tab.id === activeTabId) card.classList.add('is-active');
      if (tab.external) {
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
      }

      card.innerHTML = `
        <div class="mac-dock-tab__row">
          <span class="mac-dock-tab__icon" aria-hidden="true">${renderTabIcon(tab)}</span>
          <span class="mac-dock-tab__title">${tab.title}</span>
        </div>
        <span class="mac-dock-tab__hr" aria-hidden="true"></span>
        <div class="mac-dock-tab__row">
          <span class="mac-dock-tab__subtitle">${tab.subtitle}</span>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (tab.href === '#') e.preventDefault();
        activeTabId = tab.id;
        renderTabPanel();
      });

      tabRow.appendChild(card);
    });

    requestAnimationFrame(() => {
      scrollActiveTabIntoView();
      updateCaretPosition();
    });
  }

  function selectApp(appId) {
    activeAppId = appId;
    const tabs = APP_TABS[appId];
    if (tabs && !tabs.some((t) => t.id === activeTabId)) {
      activeTabId = tabs[0].id;
    }
    renderTabPanel();
    updateActiveIconStyles();
  }

  window.addEventListener('resize', updateCaretPosition);

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(updateCaretPosition).observe(shell);
  }

  selectApp('arc');
})();
