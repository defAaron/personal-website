/**
 * Hover grow for the Work page iPad. Rest is a small centered scale;
 * .is-hovering grows to full size (sized to fit the card, no crop).
 */
(function () {
  const tile = document.getElementById('aaron-ipad-tile');
  if (!tile) return;

  tile.addEventListener('mouseenter', () => {
    tile.classList.add('is-hovering');
  });
  tile.addEventListener('mouseleave', () => {
    tile.classList.remove('is-hovering', 'is-cursor');
  });

  const cursor = document.getElementById('aaron-ipad-cursor');
  if (cursor) {
    let cursorX = 0;
    let cursorY = 0;
    let cursorRaf = 0;

    const flushCursor = () => {
      cursorRaf = 0;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    };

    // Same model as the gallery phone: track on the tile, show blob only
    // over the device. rAF-coalesce so Files UI hover paint can't stall
    // multiple transform writes in one frame.
    tile.addEventListener('mousemove', (e) => {
      const overIpad = !!e.target.closest('.aaron-ipad');
      tile.classList.toggle('is-cursor', overIpad);
      if (!overIpad) return;
      cursorX = e.clientX;
      cursorY = e.clientY;
      if (!cursorRaf) cursorRaf = requestAnimationFrame(flushCursor);
    });
  }

  const timeEl = document.getElementById('aaron-ipad-time');
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

  const filesRoot = document.querySelector('.aaron-files');
  const grid = document.getElementById('aaron-files-grid');
  const titleEl = document.getElementById('aaron-files-title');
  if (!filesRoot || !grid || !titleEl) return;

  const sidebarToggle = document.getElementById('aaron-files-sidebar-toggle');
  const sidebarOpen = document.getElementById('aaron-files-sidebar-open');
  const backBtn = document.getElementById('aaron-files-back');
  const forwardBtn = document.getElementById('aaron-files-forward');
  const viewBtn = document.getElementById('aaron-files-view-btn');
  const viewMenu = document.getElementById('aaron-files-view-menu');
  const searchBtn = document.getElementById('aaron-files-search-btn');
  const searchWrap = document.getElementById('aaron-files-search-wrap');
  const searchInput = document.getElementById('aaron-files-search');

  const WRITE_SECTIONS = [
    { key: 'overview', label: 'Overview' },
    { key: 'problem', label: 'The problem' },
    { key: 'solution', label: 'The solution' },
    { key: 'architecture', label: 'Technical architecture' },
    { key: 'whyItWorks', label: 'Why it works' },
    { key: 'learned', label: 'What I learned' },
  ];

  function projectWrite(overview, extra) {
    return {
      overview,
      problem: '',
      solution: '',
      architecture: '',
      whyItWorks: '',
      learned: '',
      ...extra,
    };
  }

  const PROJECTS = {
    skyeye: {
      name: 'SkyEye',
      sortDate: 202608,
      tagline: 'AI-assisted missing person search from drone photos.',
      mp4: '/assets/projects/skyeye/preview.mp4',
      desc: 'an AI-assisted missing person search tool that turns a free-text report into a Lost Person Behavior search ring, then scans drone photographs for ranked person-shaped candidates so rescue teams know where to look first.',
      stack: ['Python', 'Flask', 'YOLOv8n', 'ONNX', 'Gemini API', 'Groq', 'Google Maps API', 'React', 'TypeScript', 'Vite', 'Three.js', 'Docker', 'Vercel', 'Render'],
      write: projectWrite(
        'an AI-assisted missing person search tool that turns a free-text report into a Lost Person Behavior search ring, then scans drone photographs for ranked person-shaped candidates so rescue teams know where to look first.',
        { learned: 'More SkyEye notes: challenges, decisions, results — placeholder for now.' },
      ),
    },
    surpluslink: {
      name: 'SurplusLink',
      sortDate: 202608,
      tagline: 'Unused eatery food, routed into claimable pickups.',
      youtube: 'eU8L9HmfpPg',
      desc: 'an app that turns unused food from eateries into claimable pickups through computer vision and route optimization.',
      stack: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'Auth.js', 'Hugging Face Transformers', 'Leaflet', 'Vercel'],
      write: projectWrite(
        'an app that turns unused food from eateries into claimable pickups through computer vision and route optimization.',
        { learned: 'More SurplusLink notes: vision model choices, logistics, and what we would ship next — placeholder for now.' },
      ),
    },
    honeydesk: {
      name: 'HoneyDesk',
      sortDate: 202608,
      tagline: 'Live phishing decoys that teach students in plain English.',
      youtube: '8cGpsI5qa2U',
      desc: 'educative application that traps student phishing attempts through live decoys, classifying the attack in real time, and turn it into a plain-English brief students can act on.',
      stack: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'SQLite', 'shadcn/ui', 'Render'],
      write: projectWrite(
        'educative application that traps student phishing attempts through live decoys, classifying the attack in real time, and turn it into a plain-English brief students can act on.',
        { learned: 'More HoneyDesk notes: classification, UX for students, and deployment lessons — placeholder for now.' },
      ),
    },
    baio: {
      name: 'baio',
      sortDate: 202608,
      tagline: 'Sketch a page; AI grows real components where you drew.',
      mp4: '/assets/projects/baio/baio.mp4',
      desc: 'magic paper with AI autocomplete for drawing: sketch a rough webpage, press enter, and real editable components bloom in like wet ink exactly where you drew them, then frame it into a working website.',
      stack: ['Next.js', 'TypeScript', 'Gemini API', 'Anthropic API', 'FreeSolo', 'Qwen3.5-2B', 'perfect-freehand', 'framer-motion', 'Zod', 'Vercel', 'Base44'],
      write: projectWrite(
        'magic paper with AI autocomplete for drawing: sketch a rough webpage, press enter, and real editable components bloom in like wet ink exactly where you drew them, then frame it into a working website.',
        { learned: 'More baio notes: model routing, stroke handling, and framing into a live site — placeholder for now.' },
      ),
    },
    techniquetitan: {
      name: 'TechTitan',
      sortDate: 202609,
      tagline: 'Live camera feedback on piano hand posture.',
      mp4: '/assets/projects/techniquetitan/techtitan.mp4',
      desc: 'a real-time hand tracking and 21-landmark finger bone recognition computer vision application that evaluates hand piano posture through live camera feed, running a feedback engine for heuristic scoring.',
      stack: ['Python', 'MediaPipe', 'OpenCV', 'NumPy', 'FastAPI', 'React', 'TypeScript', 'Tailwind', 'Streamlit', 'PyYAML', 'Vercel', 'Docker', 'Render', 'Github Actions + pytest'],
      write: projectWrite(
        'Technique Titan is perhaps my most ambitious project yet. I have been longing for a software tool like this for as long as I can remember. Being a pianist ever since the age of 3, ',
        { learned: 'More TechTitan notes: landmark noise, scoring rules, and CI lessons — placeholder for now.' },
      ),
    },
    clipcoach: {
      name: 'ClipCoach',
      sortDate: 202607,
      tagline: 'Auto-cut game footage into music-synced highlight reels.',
      youtube: 'KKq0Axw3u-M',
      desc: 'an AI post-game highlight editor that fuses audio energy and visual motion into one excitement curve to auto-cut raw game footage into a music-synced highlight reel, with a timeline editor for instant re-renders.',
      stack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'ffmpeg', 'librosa', 'OpenCV', 'Docker'],
      write: projectWrite(
        'an AI post-game highlight editor that fuses audio energy and visual motion into one excitement curve to auto-cut raw game footage into a music-synced highlight reel, with a timeline editor for instant re-renders.',
        { learned: 'More ClipCoach notes: timeline editing, re-renders, and sync tricks — placeholder for now.' },
      ),
    },
    fraudgen: {
      name: 'FraudGen',
      sortDate: 202603,
      tagline: 'Synthetic fraud networks for stronger GNN detection.',
      mp4: '/assets/projects/fraudgen/fraudgen.mp4',
      desc: 'a multi-agent adversarial AI pipeline that synthesizes fraud transaction networks, closing the known-unknown gap in GNN-based fraud detection.',
      stack: ['Python', 'Anthropic API', 'Streamlit', 'Next.js', 'FastAPI', 'Pandas', 'Pydantic', 'Matplotlib'],
      write: projectWrite(
        'a multi-agent adversarial AI pipeline that synthesizes fraud transaction networks, closing the known-unknown gap in GNN-based fraud detection.',
        { learned: 'More FraudGen notes: agent roles, graph structure, and evaluation — placeholder for now.' },
      ),
    },
    mycellium: {
      name: 'Mycellium',
      sortDate: 202603,
      tagline: 'Distributed farms coordinated by comparative advantage and MILP.',
      youtube: 'x6as0gVqb7Y',
      desc: 'an optimized multi-nodal network that coordinates crop production across a distributed network of farms using comparative advantage and integer linear programming.',
      stack: ['Python', 'SciPy MILP', 'FastAPI', 'React.js', 'TypeScript', 'Google Maps API', 'Tailscale'],
      write: projectWrite(
        'an optimized multi-nodal network that coordinates crop production across a distributed network of farms using comparative advantage and integer linear programming.',
        { learned: 'More Mycellium notes: farm nodes, constraints, and network ops — placeholder for now.' },
      ),
    },
    personalwebsite: {
      name: 'Personal Website',
      sortDate: 202607,
      tagline: 'A from-scratch site about me and my work.',
      desc: 'this website, built from scratch to tell you about me and what I\'ve been doing.',
      stack: ['HTML', 'CSS', 'JavaScript', 'Creativity'],
      write: projectWrite(
        'this website, built from scratch to tell you about me and what I\'ve been doing.',
        { learned: 'More personal site notes: interaction details and polish passes — placeholder for now.' },
      ),
    },
  };

  const TABS = {
    recents: {
      title: 'Recents',
      files: ['skyeye', 'surpluslink', 'honeydesk', 'techniquetitan', 'baio', 'fraudgen'],
    },
    certifications: {
      title: 'Certifications',
      files: [
        { name: 'Essentials with Azure Fundamentals', place: 'Microsoft', date: '2026', href: 'https://www.coursera.org/account/accomplishments/verify/0ANYC7RFYAPJ?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course' },
        { name: 'Google AI Essentials', place: 'Google', date: '2026', href: 'https://www.coursera.org/account/accomplishments/specialization/ZH9LB9F719BF' },
        { name: 'Building with the Claude API', place: 'Anthropic', date: '2026', href: 'https://verify.skilljar.com/c/hqvg49o7skvd' },
        { name: 'Level 10 Piano with Honours', place: 'RCM', date: '2026' },
        { name: 'Level 10 Music History with Honours', place: 'RCM', date: '2024' },
        { name: 'CS50x', place: 'Harvard University + edX', date: '2024', href: 'https://courses.edx.org/certificates/bd2444786c0e4af7918ea91f1ac2a968' },
        { name: 'Standard First Aid with CPR-C', place: 'Lifesaving Society Canada', date: '2023' },
        { name: 'Emergency First Aid with CPR-B', place: 'Lifesaving Society Canada', date: '2023' },
        { name: 'Bronze Cross', place: 'Lifesaving Society Canada', date: '2023' },
        { name: 'Bronze Medallion', place: 'Lifesaving Society Canada', date: '2023' },
      ],
    },
    'social-good': {
      title: 'Social Good',
      files: ['skyeye', 'surpluslink', 'honeydesk'],
    },
    finance: {
      title: 'Finance',
      files: ['fraudgen', 'mycellium'],
    },
    design: {
      title: 'Design',
      files: ['baio', 'personalwebsite'],
    },
    'media-tools': {
      title: 'Media Tools',
      files: ['techniquetitan', 'clipcoach'],
    },
    hackathons: {
      title: 'Hackathons',
      files: ['skyeye', 'surpluslink', 'honeydesk', 'baio', 'clipcoach', 'fraudgen', 'mycellium'],
    },
    'personal-projects': {
      title: 'Personal Projects',
      files: ['personalwebsite', 'techniquetitan'],
    },
    'computer-vision': {
      title: 'Computer Vision',
      files: ['skyeye', 'surpluslink', 'techniquetitan', 'clipcoach'],
    },
    'generative-ai': {
      title: 'Generative AI',
      files: ['skyeye', 'baio', 'fraudgen', 'surpluslink'],
    },
    'classical-ml': {
      title: 'Classical ML + Optimization',
      files: ['fraudgen', 'mycellium'],
    },
    devops: {
      title: 'Devops',
      files: ['techniquetitan', 'skyeye'],
    },
  };

  const FILE_THUMB = `
    <svg viewBox="0 0 44 56" aria-hidden="true">
      <rect width="44" height="56" rx="4.2" fill="#f4f4f7"/>
      <path d="M31.4 0h8.4A4.2 4.2 0 0 1 44 4.2V13L31.4 0Z" fill="#e6e6eb"/>
      <path d="M31.4 0v8.8A4.2 4.2 0 0 0 35.6 13H44" fill="none" stroke="#d2d2d8" stroke-width=".7"/>
    </svg>`;

  const FOLDER_THUMB = `
    <svg viewBox="0 0 44 56" aria-hidden="true">
      <path d="M4 16h13.2l3.6 3.6H38a3.6 3.6 0 0 1 3.6 3.6v24.8A3.6 3.6 0 0 1 38 52H6A3.6 3.6 0 0 1 2.4 48.4V16A3.6 3.6 0 0 1 6 12.4h2.4V16Z" fill="#69b3f7"/>
      <path d="M4 16V13.6A3.6 3.6 0 0 1 7.6 10h9.6l3.6 3.6H38a3.6 3.6 0 0 1 3.6 3.6V16H4Z" fill="#4da3f5"/>
    </svg>`;

  const ISSUER_ICONS = {
    Microsoft: '/assets/certs/microsoft.png',
    Google: '/assets/certs/google.png',
    Anthropic: '/assets/certs/anthropic.png',
    RCM: '/assets/certs/rcm-favicon.png',
    'Harvard University + edX': '/assets/certs/harvard.png',
    'Lifesaving Society Canada': '/assets/certs/lifesaving.png',
  };

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalizeWrite(project) {
    const raw = project.write;
    if (raw && !Array.isArray(raw) && typeof raw === 'object') {
      return raw;
    }
    const legacy = Array.isArray(raw) ? raw : (raw ? [raw] : []);
    return projectWrite(project.desc || legacy[0] || '', {
      learned: legacy[1] || '',
    });
  }

  function renderWriteHtml(project) {
    const sections = normalizeWrite(project);
    return WRITE_SECTIONS.map(({ key, label }) => {
      const body = sections[key];
      if (body == null || !String(body).trim()) return '';
      return `
        <section class="aaron-ipad-pop__write-section">
          <h4 class="aaron-ipad-pop__write-heading">${esc(label)}</h4>
          <p class="aaron-ipad-pop__write-text">${esc(body)}</p>
        </section>
      `;
    }).join('');
  }

  function writeHasContent(project) {
    const sections = normalizeWrite(project);
    return WRITE_SECTIONS.some(({ key }) => {
      const body = sections[key];
      return body != null && String(body).trim();
    });
  }

  function resolveFiles(entries) {
    return entries.map((entry) => (
      typeof entry === 'string' ? { id: entry, ...PROJECTS[entry] } : entry
    )).filter(Boolean);
  }

  function isCertification(file) {
    return file.place != null;
  }

  function thumbForFile(file) {
    if (isCertification(file)) {
      const icon = ISSUER_ICONS[file.place];
      const badge = icon
        ? `<img class="aaron-files__badge" src="${esc(icon)}" alt="" aria-hidden="true" />`
        : '';
      return `<span class="aaron-files__thumb aaron-files__thumb--file">${FILE_THUMB}${badge}</span>`;
    }
    return `<span class="aaron-files__thumb aaron-files__thumb--folder">${FOLDER_THUMB}</span>`;
  }

  function fileSortDate(file) {
    if (file.sortDate != null) return file.sortDate;
    const year = parseInt(file.date, 10);
    return Number.isFinite(year) ? year * 100 : 0;
  }

  let currentTab = 'recents';
  let viewMode = 'icons';
  let sortMode = null;
  let query = '';
  const tabHistory = ['recents'];
  let historyIndex = 0;

  function syncHistoryButtons() {
    const atStart = historyIndex <= 0;
    const atEnd = historyIndex >= tabHistory.length - 1;
    if (backBtn) {
      backBtn.classList.toggle('is-disabled', atStart);
      backBtn.disabled = atStart;
    }
    if (forwardBtn) {
      forwardBtn.classList.toggle('is-disabled', atEnd);
      forwardBtn.disabled = atEnd;
    }
  }

  function syncViewMenu() {
    if (!viewMenu) return;
    viewMenu.querySelectorAll('[data-view]').forEach((item) => {
      const on = item.getAttribute('data-view') === viewMode;
      item.classList.toggle('is-checked', on);
      item.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    viewMenu.querySelectorAll('[data-sort]').forEach((item) => {
      const on = item.getAttribute('data-sort') === sortMode;
      item.classList.toggle('is-checked', on);
      item.setAttribute('aria-checked', on ? 'true' : 'false');
    });
  }

  function setMenuOpen(open) {
    if (!viewMenu || !viewBtn) return;
    viewMenu.hidden = !open;
    viewBtn.classList.toggle('is-active', open);
    viewBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function setSidebarHidden(hidden) {
    filesRoot.classList.toggle('is-sidebar-hidden', hidden);
    if (sidebarToggle) {
      sidebarToggle.setAttribute('aria-expanded', hidden ? 'false' : 'true');
      sidebarToggle.setAttribute('aria-label', hidden ? 'Show sidebar' : 'Hide sidebar');
      sidebarToggle.title = hidden ? 'Show sidebar' : 'Hide sidebar';
    }
    if (sidebarOpen) sidebarOpen.hidden = !hidden;
  }

  function setSearchOpen(open) {
    if (!searchWrap || !searchBtn) return;
    searchWrap.classList.toggle('is-open', open);
    searchBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (searchInput) searchInput.tabIndex = open ? 0 : -1;
    if (open) {
      searchInput?.focus();
    } else if (query) {
      query = '';
      if (searchInput) searchInput.value = '';
      renderTab(currentTab);
    }
  }

  function visibleFiles(tab) {
    let files = resolveFiles(tab.files);
    const needle = query.trim().toLowerCase();
    if (needle) {
      files = files.filter((file) => {
        const hay = [file.name, file.place, file.date].filter(Boolean).join(' ').toLowerCase();
        return hay.includes(needle);
      });
    }
    if (sortMode === 'name') {
      files = files.slice().sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    } else if (sortMode === 'date') {
      files = files.slice().sort((a, b) => fileSortDate(b) - fileSortDate(a) || a.name.localeCompare(b.name));
    }
    return files;
  }

  function sectionLabel(section) {
    return section.querySelector('span')?.textContent.trim() || 'section';
  }

  function setGroupCollapsed(section, collapsed) {
    const group = section.closest('.aaron-files__group');
    if (!group) return;
    group.classList.toggle('is-collapsed', collapsed);
    section.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    const label = sectionLabel(section);
    section.title = collapsed ? `Show ${label}` : `Hide ${label}`;
  }

  function expandGroupForTab(tabId) {
    const row = filesRoot.querySelector(`.aaron-files__row[data-tab="${tabId}"]`);
    const section = row?.closest('.aaron-files__group')?.querySelector('.aaron-files__section');
    if (section) setGroupCollapsed(section, false);
  }

  function renderTab(tabId) {
    const tab = TABS[tabId];
    if (!tab) return;

    currentTab = tabId;
    titleEl.textContent = tab.title;
    grid.classList.toggle('is-list', viewMode === 'list');
    expandGroupForTab(tabId);

    const files = visibleFiles(tab);
    grid.innerHTML = files.length
      ? files.map((file) => {
          const inner = `
            ${thumbForFile(file)}
            <span class="aaron-files__meta">
              <span class="aaron-files__name">${esc(file.name)}</span>
              ${file.date ? `<span class="aaron-files__date">${esc(file.date)}</span>` : ''}
              ${file.place ? `<span class="aaron-files__place">${esc(file.place)}</span>` : ''}
            </span>
          `;
          if (file.href) {
            return `
              <a class="aaron-files__item" href="${esc(file.href)}" target="_blank" rel="noopener noreferrer" data-file="${esc(file.name)}" aria-label="Open ${esc(file.name)} certificate">
                ${inner}
              </a>
            `;
          }
          const projectAttr = file.id ? ` data-project="${esc(file.id)}"` : '';
          return `
            <button type="button" class="aaron-files__item" data-file="${esc(file.name)}"${projectAttr}>
              ${inner}
            </button>
          `;
        }).join('')
      : `<p class="aaron-files__empty">${query.trim() ? 'No Results' : 'No Files'}</p>`;

    document.querySelectorAll('.aaron-files__row[data-tab]').forEach((row) => {
      row.classList.toggle('is-active', row.getAttribute('data-tab') === tabId);
    });
    syncHistoryButtons();
    syncViewMenu();
  }

  function openTab(tabId) {
    if (!TABS[tabId] || tabId === currentTab) return;
    tabHistory.splice(historyIndex + 1);
    tabHistory.push(tabId);
    historyIndex = tabHistory.length - 1;
    renderTab(tabId);
  }

  function onRowActivate(row) {
    const tabId = row.getAttribute('data-tab');
    if (tabId) openTab(tabId);
  }

  document.querySelectorAll('.aaron-files__row[data-tab]').forEach((row) => {
    row.addEventListener('click', () => onRowActivate(row));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onRowActivate(row);
      }
    });
  });

  filesRoot.querySelectorAll('.aaron-files__section').forEach((section) => {
    section.addEventListener('click', () => {
      const collapsed = section.getAttribute('aria-expanded') !== 'false';
      setGroupCollapsed(section, collapsed);
    });
  });

  sidebarToggle?.addEventListener('click', () => {
    setSidebarHidden(!filesRoot.classList.contains('is-sidebar-hidden'));
  });

  sidebarOpen?.addEventListener('click', () => {
    setSidebarHidden(false);
  });

  backBtn?.addEventListener('click', () => {
    if (historyIndex <= 0) return;
    historyIndex -= 1;
    renderTab(tabHistory[historyIndex]);
  });

  forwardBtn?.addEventListener('click', () => {
    if (historyIndex >= tabHistory.length - 1) return;
    historyIndex += 1;
    renderTab(tabHistory[historyIndex]);
  });

  viewBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenuOpen(viewMenu?.hidden !== false);
  });

  viewMenu?.addEventListener('click', (e) => {
    const item = e.target.closest('[data-view], [data-sort]');
    if (!item) return;
    if (item.hasAttribute('data-view')) viewMode = item.getAttribute('data-view');
    if (item.hasAttribute('data-sort')) sortMode = item.getAttribute('data-sort');
    setMenuOpen(false);
    renderTab(currentTab);
  });

  document.addEventListener('click', (e) => {
    if (viewMenu && !viewMenu.hidden && !e.target.closest('.aaron-files__view-wrap')) {
      setMenuOpen(false);
    }
    if (searchWrap?.classList.contains('is-open') && !e.target.closest('.aaron-files__search')) {
      setSearchOpen(false);
    }
  });

  searchBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    setSearchOpen(!searchWrap?.classList.contains('is-open'));
  });

  searchInput?.addEventListener('input', () => {
    query = searchInput.value;
    renderTab(currentTab);
  });

  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setSearchOpen(false);
    }
  });

  const pop = document.getElementById('aaron-ipad-pop');
  const popTitle = document.getElementById('aaron-ipad-pop-title');
  const popDesc = document.getElementById('aaron-ipad-pop-desc');
  const popStackBlock = document.getElementById('aaron-ipad-pop-stack-block');
  const popStack = document.getElementById('aaron-ipad-pop-stack');
  const popWrite = document.getElementById('aaron-ipad-pop-write');
  const popDemo = document.getElementById('aaron-ipad-pop-demo');
  const popClose = document.getElementById('aaron-ipad-pop-close');
  const popBackdrop = document.getElementById('aaron-ipad-pop-backdrop');
  function isPopOpen() {
    return Boolean(pop && !pop.hidden);
  }

  function clearDemo() {
    if (!popDemo) return;
    popDemo.querySelectorAll('video').forEach((el) => {
      el.pause();
      el.removeAttribute('src');
      try { el.load(); } catch (e) { /* ignore */ }
      el.remove();
    });
    popDemo.querySelectorAll('iframe').forEach((el) => el.remove());
    popDemo.classList.remove('has-video');
    popDemo.style.removeProperty('background-image');
  }

  function closeProject() {
    if (!pop) return;
    clearDemo();
    pop.hidden = true;
  }

  function openProject(id) {
    const project = PROJECTS[id];
    if (!project || !pop || !popTitle || !popDesc || !popStack) return;

    popTitle.textContent = project.name;
    popDesc.textContent = project.tagline || project.desc || '';

    const stack = project.stack || [];
    if (popStack) {
      popStack.innerHTML = stack
        .map((chip) => `<span class="aaron-ipad-pop__chip">${esc(chip)}</span>`)
        .join('');
    }
    if (popStackBlock) {
      popStackBlock.hidden = stack.length === 0;
    }

    if (popWrite) {
      popWrite.innerHTML = renderWriteHtml(project);
      popWrite.hidden = !writeHasContent(project);
    }

    clearDemo();
    if (popDemo && project.mp4) {
      popDemo.classList.add('has-video');
      const video = document.createElement('video');
      video.className = 'aaron-ipad-pop__video';
      video.src = project.mp4;
      video.title = `${project.name} demo`;
      video.muted = true;
      video.defaultMuted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.controls = true;
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      popDemo.appendChild(video);
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(() => {});
      }
    } else if (popDemo && project.youtube) {
      popDemo.classList.add('has-video');
      popDemo.style.backgroundImage = `url("https://i.ytimg.com/vi/${esc(project.youtube)}/hqdefault.jpg")`;
      const iframe = document.createElement('iframe');
      iframe.className = 'aaron-ipad-pop__video';
      iframe.title = `${project.name} demo`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(project.youtube)}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;
      popDemo.appendChild(iframe);
    }

    pop.hidden = false;
    setMenuOpen(false);
    popClose?.focus();
  }

  let folderOpening = false;

  function playFolderThenOpen(item, id) {
    if (folderOpening || isPopOpen()) return;

    const thumb = item.querySelector('.aaron-files__thumb--folder');
    const skipMotion = !thumb || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (skipMotion) {
      openProject(id);
      return;
    }

    folderOpening = true;
    item.classList.add('is-opening');

    let done = false;
    const finish = (e) => {
      if (done) return;
      if (e && e.animationName && e.animationName !== 'aaron-folder-flip') return;
      done = true;
      thumb.removeEventListener('animationend', finish);
      window.clearTimeout(fallback);
      item.classList.remove('is-opening');
      folderOpening = false;
      openProject(id);
    };

    const fallback = window.setTimeout(() => finish(), 560);
    thumb.addEventListener('animationend', finish);
  }

  grid.addEventListener('click', (e) => {
    const item = e.target.closest('[data-project]');
    if (!item) return;
    playFolderThenOpen(item, item.getAttribute('data-project'));
  });

  popClose?.addEventListener('click', closeProject);
  popBackdrop?.addEventListener('click', closeProject);

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (isPopOpen()) {
      closeProject();
      return;
    }
    if (viewMenu && !viewMenu.hidden) setMenuOpen(false);
    if (searchWrap?.classList.contains('is-open')) setSearchOpen(false);
  });

  renderTab('recents');
})();
