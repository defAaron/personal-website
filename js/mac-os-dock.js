/**
 * Marco.fyi cmd-dock + tilda-bar replica
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
      id: 'figma',
      name: 'Figma',
      icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62c909916f6892fbf32c42dc_figma.webp',
      accent: '#a259ff',
      accentBg: '#ede5ff',
      tabActiveBg: '#f5f0ff',
    },
    {
      id: 'webflow',
      name: 'Webflow',
      icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62c90418ca69f34b8f9203e2_webflow.webp',
      accent: '#4353ff',
      accentBg: '#e8ebff',
      tabActiveBg: '#eef0ff',
    },
    {
      id: 'superhuman',
      name: 'Superhuman',
      icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62c9041809e7a2ac71ddc8aa_superhuman.webp',
      accent: '#2dc08f',
      accentBg: '#e9f3f2',
      tabActiveBg: '#ecfdf8',
    },
    {
      id: 'linear',
      name: 'Linear',
      icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62c906ccc50496a2c7a8ac80_Linear.webp',
      accent: '#5e6ad2',
      accentBg: '#e8eafc',
      tabActiveBg: '#eff0ff',
    },
    {
      id: 'marisol',
      name: 'Marisol Jones',
      icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/630d7a9bbf383e7558aa9db2_630d6daa5edb52f8a5433beb_62fea588d12c7147d3b1302a_marisol-new-min.webp',
      accent: '#ec4899',
      accentBg: '#fce7f3',
      tabActiveBg: '#fdf2f8',
      round: true,
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62c906ccc504966b02a8ac8c_Slack.webp',
      accent: '#611f69',
      accentBg: '#f3e8f4',
      tabActiveBg: '#faf5fb',
    },
  ];

  const APP_TABS = {
    arc: [
      { id: 'arc-1', title: 'Marco Cornacchia', subtitle: 'https://marcooo.xyz/', emoji: '👤', href: 'https://marcooo.xyz/', external: true },
      { id: 'arc-2', title: 'marco ✦ (@marcofyi)', subtitle: 'https://twitter.com/marcofyi', emoji: '🐦', href: 'https://twitter.com/marcofyi', external: true },
      { id: 'arc-3', title: 'Are.na — Marco Cornacchia', subtitle: 'are.na/marco-cornacchia', emoji: '📌', href: 'https://www.are.na/marco-cornacchia', external: true },
      { id: 'arc-4', title: 'Sidebar', subtitle: 'sidebar.io', emoji: '📰', href: 'https://sidebar.io/', external: true },
      { id: 'arc-5', title: 'Good News', subtitle: 'news.hifolks.com', emoji: '✨', href: 'https://news.hifolks.com/', external: true },
    ],
    notion: [
      { id: 'notion-1', title: 'DotOS Notes', subtitle: "Marco's Workspace", emoji: '🧞', href: '#', external: false },
      { id: 'notion-2', title: '1-on-1 Meeting Notes', subtitle: "Marco's Workspace", emoji: '✏️', href: '#', external: false },
      { id: 'notion-3', title: 'Project Timeline', subtitle: "Marco's Workspace", emoji: '⏰', href: '#', external: false },
      { id: 'notion-4', title: 'Tasks', subtitle: "Marco's Workspace", emoji: '✅', href: '#', external: false },
      { id: 'notion-5', title: 'Dev Handoffs', subtitle: "Marco's Workspace", emoji: '🔧', href: '#', external: false },
      { id: 'notion-6', title: 'Reads', subtitle: "Marco's Workspace", emoji: '📚', href: '#', external: false },
    ],
    figma: [
      { id: 'figma-1', title: 'DotOS Design', subtitle: 'figma.com/dot-os-design', emoji: '🎨', href: '#', external: false },
      { id: 'figma-2', title: 'Design Sesh', subtitle: 'figma.com/design-sesh', emoji: '💬', href: '#', external: false },
      { id: 'figma-3', title: 'Portfolio 2.0', subtitle: 'figma.com/portfolio-2-0', emoji: '✦', href: '#', external: false },
      { id: 'figma-4', title: 'Empathy Map', subtitle: 'figma.com/empathy-map', emoji: '🗺', href: '#', external: false },
    ],
    webflow: [
      { id: 'wf-1', title: 'Dashboard', subtitle: 'webflow.com/dashboard', emoji: '📊', href: '#', external: false },
      { id: 'wf-2', title: 'Portfolio 2.0', subtitle: 'webflow.com/design/portfolio-2-0', emoji: '✦', href: '#', external: false },
      { id: 'wf-3', title: 'Be Human Here – Coming Soon', subtitle: 'webflow.com/design/be-human-here', emoji: '🌱', href: '#', external: false },
    ],
    superhuman: [
      { id: 'sh-1', title: 'Invitation: All-Hands Meeting', subtitle: 'Amari, Jene, Nina +2 others', emoji: '📧', href: '#', external: false },
      { id: 'sh-2', title: 'Partnership Opportunity?', subtitle: 'Amari, Jene + 1 other', emoji: '🤝', href: '#', external: false },
      { id: 'sh-3', title: 'Everyone needs to see this lol', subtitle: 'Amari, Jene, Nina +3 others', emoji: '😂', href: '#', external: false },
    ],
    linear: [
      { id: 'lin-1', title: 'Launch Portfolio', subtitle: 'linear.app/marcofyi', emoji: '🚀', href: '#', external: false },
      { id: 'lin-2', title: 'Write Intro + Publish', subtitle: 'linear.app/marcofyi', emoji: '✍️', href: '#', external: false },
      { id: 'lin-3', title: 'Presentation Deck', subtitle: 'linear.app/marcofyi', emoji: '📊', href: '#', external: false },
      { id: 'lin-4', title: 'Take Interviews', subtitle: 'linear.app/marcofyi', emoji: '🎤', href: '#', external: false },
    ],
    marisol: [
      { id: 'mari-1', title: 'Mari ✨', subtitle: 'noooo for real tho lol', emoji: '💬', href: '#', external: false },
      { id: 'mari-2', title: 'marisol jones • @mariiiiijones', subtitle: 'reminder to drink water & rest 💕', emoji: '🐦', href: '#', external: false },
      { id: 'mari-3', title: 'Marisol Jones', subtitle: 'thanks, ill hit you up later', emoji: '💬', href: '#', external: false },
      { id: 'mari-4', title: 'Marisol left a comment', subtitle: "i'd add some spacing here", emoji: '💭', href: '#', external: false },
    ],
    slack: [
      { id: 'slack-1', title: 'general', subtitle: 'marco.slack.com', emoji: '#', href: '#', external: false },
      { id: 'slack-2', title: 'Marisol Jones', subtitle: 'work.slack.com', emoji: '👤', href: '#', external: false },
      { id: 'slack-3', title: 'design', subtitle: 'marco.slack.com', emoji: '#', href: '#', external: false },
      { id: 'slack-4', title: 'random', subtitle: 'marco.slack.com', emoji: '#', href: '#', external: false },
    ],
  };

  let activeAppId = 'notion';
  let activeTabId = APP_TABS.notion[0].id;
  const openApps = new Set(['notion']);

  const shell = document.createElement('div');
  shell.className = 'mac-dock-shell';

  const tabPanel = document.createElement('div');
  tabPanel.className = 'mac-dock-tabs is-visible';
  tabPanel.setAttribute('role', 'region');
  tabPanel.setAttribute('aria-label', 'Open tabs');

  const tabRow = document.createElement('div');
  tabRow.className = 'mac-dock-tabs__row';
  tabRow.setAttribute('role', 'tablist');

  const tabCaret = document.createElement('div');
  tabCaret.className = 'mac-dock-tabs__caret';
  tabCaret.setAttribute('aria-hidden', 'true');
  tabCaret.innerHTML =
    '<svg width="34" height="14" viewBox="0 0 34 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 14L0 0h34L17 14z" fill="#fff" stroke="#cccccf" stroke-width="1"/></svg>';

  tabPanel.append(tabRow, tabCaret);

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
    dot.hidden = !openApps.has(app.id);

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
      const isOpen = openApps.has(entry.app.id);
      entry.btn.classList.toggle('is-active', isActive);
      entry.ring.hidden = !isActive;
      entry.btn.querySelector('.mac-dock__indicator').hidden = !isOpen;
    });
    updateCaretPosition();
  }

  function renderTabPanel() {
    const tabs = APP_TABS[activeAppId] || [];
    applyAccentVars();
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
          <span class="mac-dock-tab__icon" aria-hidden="true">${tab.emoji}</span>
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
      const activeCard = tabRow.querySelector('.mac-dock-tab.is-active');
      if (activeCard) {
        activeCard.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
      }
      updateCaretPosition();
    });
  }

  function selectApp(appId) {
    activeAppId = appId;
    openApps.add(appId);
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

  selectApp('notion');
})();
