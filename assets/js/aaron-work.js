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
  if (!filesRoot || !grid) return;

  const sidebarToggle = document.getElementById('aaron-files-sidebar-toggle');
  const sidebarOpen = document.getElementById('aaron-files-sidebar-open');
  const backBtn = document.getElementById('aaron-files-back');
  const forwardBtn = document.getElementById('aaron-files-forward');
  const viewBtn = document.getElementById('aaron-files-view-btn');
  const viewMenu = document.getElementById('aaron-files-view-menu');
  const viewMenuLayout = document.getElementById('aaron-files-menu-view');
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

  const WRITE_WIP = projectWrite('Work in progress.');

  function writeForProject(id) {
    if (typeof AARON_WORK_WRITEUPS !== 'undefined' && AARON_WORK_WRITEUPS[id]) {
      return { ...projectWrite('', {}), ...AARON_WORK_WRITEUPS[id] };
    }
    return WRITE_WIP;
  }

  const WORK_IDS = ['magichour', 'uwcube', 'uwarg'];

  const PROJECTS = {
    magichour: {
      name: 'Software Engineering Intern at Magic Hour',
      sortDate: 202609,
      tagline: 'AI video startup backed by Y Combinator',
      poster: '/assets/work/magichour.png',
      desc: 'software engineering intern building product and internal tooling at Magic Hour, an AI video platform.',
      live: 'https://magichour.ai',
      write: WRITE_WIP,
    },
    uwcube: {
      name: 'Design Engineer at UW Cube',
      sortDate: 202608,
      tagline: 'Designing software for real-world problems',
      poster: '/assets/work/uw-cube.png',
      desc: 'building internal tools at UW Cube, the University of Waterloo\'s student-run satellite and space hardware lab.',
      live: 'https://www.linkedin.com/company/uwcube/posts/?feedView=all',
      write: WRITE_WIP,
    },
    uwarg: {
      name: 'Autonomy Software Engineer at UWARG',
      sortDate: 202610,
      tagline: 'Building and programming autonomous drones',
      poster: '/assets/work/uwarg.png',
      desc: 'writing software for autonomous drones with the University of Waterloo Aerospace Robotics Group.',
      live: 'https://www.uwarg.com',
      write: WRITE_WIP,
    },
    skyeye: {
      name: 'SkyEye',
      sortDate: 202608,
      tagline: 'AI-assisted missing person search from drone photos - won 1st at Rescue Hacks.',
      mp4: '/assets/projects/skyeye/preview.mp4',
      poster: '/assets/projects/skyeye/reel.jpg',
      desc: 'an AI-assisted missing person search tool that turns a free-text report into a Lost Person Behavior search ring, then scans drone photographs for ranked person-shaped candidates so rescue teams know where to look first.',
      stack: ['Python', 'Flask', 'YOLOv8n', 'ONNX', 'Gemini API', 'Groq', 'Google Maps API', 'React', 'TypeScript', 'Vite', 'Three.js', 'Docker', 'Vercel', 'Render'],
      github: 'https://github.com/defAaron/skyeye',
      live: 'https://skyeye-one.vercel.app',
      write: writeForProject('skyeye'),
    },
    surpluslink: {
      name: 'SurplusLink',
      sortDate: 202608,
      tagline: 'Unused eatery food, routed into claimable pickups - won 2nd at KY Hacks.',
      poster: '/assets/projects/surpluslink/thumbnail.png',
      youtube: 'eU8L9HmfpPg',
      desc: 'an app that turns unused food from eateries into claimable pickups through computer vision and route optimization.',
      stack: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'Auth.js', 'Hugging Face Transformers', 'Leaflet', 'Vercel'],
      github: 'https://github.com/defAaron/kyhacks',
      live: 'https://kyhacks.vercel.app',
      write: writeForProject('surpluslink'),
    },
    honeydesk: {
      name: 'HoneyDesk',
      sortDate: 202608,
      tagline: 'Live phishing decoys that teach students in plain English- won 3rd at STEMist Hacks.',
      poster: '/assets/projects/honeydesk/thumbnail.png',
      youtube: '8cGpsI5qa2U',
      desc: 'educative application that traps student phishing attempts through live decoys, classifying the attack in real time, and turn it into a plain-English brief students can act on.',
      stack: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'SQLite', 'shadcn/ui', 'Render'],
      github: 'https://github.com/defAaron/STEMist-hacks',
      live: 'https://honeydesk-web.onrender.com',
      write: writeForProject('honeydesk'),
    },
    baio: {
      name: 'Baio',
      sortDate: 202608,
      tagline: 'Magic paper with autocomplete for drawing - submitted to Ignition Hacks.',
      mp4: '/assets/projects/baio/reel.mp4?v=2',
      poster: '/assets/projects/baio/reel.jpg?v=2',
      desc: 'magic paper with AI autocomplete for drawing: sketch a rough webpage, press enter, and real editable components bloom in like wet ink exactly where you drew them, then frame it into a working website.',
      stack: ['Next.js', 'TypeScript', 'Gemini API', 'Anthropic API', 'FreeSolo', 'Qwen3.5-2B', 'perfect-freehand', 'framer-motion', 'Zod', 'Vercel', 'Base44'],
      github: 'https://github.com/defAaron/ignitionhacks26',
      live: 'https://massive-prime-product-path.base44.app',
      write: writeForProject('baio'),
    },
    techniquetitan: {
      name: 'TechTitan',
      sortDate: 202609,
      tagline: 'Real-time finger bone recognition CV to evaluate piano hand posture',
      mp4: '/assets/projects/techniquetitan/reel.mp4?v=2',
      poster: '/assets/projects/techniquetitan/reel.jpg?v=2',
      desc: 'a real-time hand tracking and 21-landmark finger bone recognition computer vision application that evaluates hand piano posture through live camera feed, running a feedback engine for heuristic scoring.',
      stack: ['Python', 'MediaPipe', 'OpenCV', 'NumPy', 'FastAPI', 'React', 'TypeScript', 'Tailwind', 'Streamlit', 'PyYAML', 'Vercel', 'Docker', 'Render', 'Github Actions + pytest'],
      github: 'https://github.com/defAaron/TechniqueTitan',
      live: 'https://technique-titan.vercel.app',
      write: writeForProject('techniquetitan'),
    },
    fraudgen: {
      name: 'FraudGen',
      sortDate: 202603,
      tagline: 'Synthetic fraud networks for stronger GNN detection - submitted to GenAI Genesis.',
      mp4: '/assets/projects/fraudgen/reel.mp4?v=2',
      poster: '/assets/projects/fraudgen/reel.jpg?v=2',
      desc: 'a multi-agent adversarial AI pipeline that synthesizes fraud transaction networks, closing the known-unknown gap in GNN-based fraud detection.',
      stack: ['Python', 'Anthropic API', 'Streamlit', 'Next.js', 'FastAPI', 'Pandas', 'Pydantic', 'Matplotlib'],
      github: 'https://github.com/101011101/GenAi',
      live: 'https://fraudgen.vercel.app',
      write: writeForProject('fraudgen'),
    },
    mycellium: {
      name: 'Mycellium',
      sortDate: 202603,
      tagline: 'Distributed farms coordinated by comparative advantage and MILP - won 1st at STEMMINDS Hacks.',
      poster: '/assets/projects/mycellium/thumbnail.png',
      youtube: 'x6as0gVqb7Y',
      desc: 'an optimized multi-nodal network that coordinates crop production across a distributed network of farms using comparative advantage and integer linear programming.',
      stack: ['Python', 'SciPy MILP', 'FastAPI', 'React.js', 'TypeScript', 'Google Maps API', 'Tailscale'],
      github: 'https://github.com/101011101/HackCanada',
      write: writeForProject('mycellium'),
    },
    personalwebsite: {
      name: 'Personal Website',
      sortDate: 202601,
      tagline: 'Built with HTML, CSS, Javascript, and love - inspired by marco.fyi',
      poster: '/assets/personal-website.png',
      desc: 'this website, built from scratch to tell you about me and what I\'ve been doing.',
      stack: ['HTML', 'CSS', 'JavaScript', 'Creativity'],
      github: 'https://github.com/defAaron/personal-website',
      live: 'https://aarondutta.com',
      write: writeForProject('personalwebsite'),
    },
  };

  const PROJECT_IDS = Object.keys(PROJECTS)
    .filter((id) => !WORK_IDS.includes(id))
    .sort((a, b) => (PROJECTS[b].sortDate || 0) - (PROJECTS[a].sortDate || 0));

  const TABS = {
    all: {
      title: 'All',
      files: [...WORK_IDS, ...PROJECT_IDS],
    },
    work: {
      title: 'Work',
      files: WORK_IDS,
    },
    projects: {
      title: 'Projects',
      files: PROJECT_IDS,
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
    hackathons: {
      title: 'Hackathons',
      files: ['skyeye', 'surpluslink', 'honeydesk', 'baio', 'fraudgen', 'mycellium'],
    },
    'personal-projects': {
      title: 'Personal Projects',
      files: ['techniquetitan', 'personalwebsite'],
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

  const WRITE_PATH_HIGHLIGHT_RE = new RegExp(
    [
      String.raw`\{[^{}]+\}(?:_\{[^{}]+\})+\.[\w]+`,
      String.raw`(?:/?@?[\w.-]+/)+[\w*{}.-]+`,
      String.raw`(?:GET|POST|PUT|PATCH|DELETE)\s+/[\w*{}./-]+`,
      String.raw`\b[\w.-]+\.(?:md|py|tsx?|jsx?|onnx|json|sql|html|css|js|yaml|yml)\b`,
    ].join('|'),
    'gi',
  );

  function writeFileHighlight(value) {
    return `<span class="aaron-ipad-pop__file">${esc(value)}</span>`;
  }

  function highlightWritePaths(plain) {
    WRITE_PATH_HIGHLIGHT_RE.lastIndex = 0;
    let result = '';
    let last = 0;
    let match = WRITE_PATH_HIGHLIGHT_RE.exec(plain);
    while (match) {
      result += esc(plain.slice(last, match.index));
      result += writeFileHighlight(match[0]);
      last = match.index + match[0].length;
      match = WRITE_PATH_HIGHLIGHT_RE.exec(plain);
    }
    result += esc(plain.slice(last));
    return result;
  }

  /** Backticks are optional; plain paths like api/geocode are highlighted too. */
  function formatWriteBody(raw) {
    const text = String(raw);
    if (!text.includes('`')) return highlightWritePaths(text);

    const parts = text.split('`');
    let html = '';
    for (let i = 0; i < parts.length; i += 1) {
      if (i % 2 === 1) {
        if (parts[i]) html += writeFileHighlight(parts[i]);
        continue;
      }
      html += highlightWritePaths(parts[i]);
    }
    return html;
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
          <p class="aaron-ipad-pop__write-text">${formatWriteBody(body)}</p>
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

  function isWorkEntry(file) {
    return file.id != null && WORK_IDS.includes(file.id);
  }

  function workProjectPartition(files) {
    const workById = new Map(files.filter(isWorkEntry).map((f) => [f.id, f]));
    const work = WORK_IDS.map((id) => workById.get(id)).filter(Boolean);
    const projects = files.filter((f) => !isWorkEntry(f));
    return { work, projects };
  }

  function orderProjectsByTab(projects) {
    const rank = new Map(PROJECT_IDS.map((id, i) => [id, i]));
    return projects.slice().sort((a, b) => (rank.get(a.id) ?? 999) - (rank.get(b.id) ?? 999));
  }

  function orderAllCategory(files, projectCompare) {
    const { work, projects } = workProjectPartition(files);
    const orderedProjects = projectCompare
      ? projects.slice().sort(projectCompare)
      : orderProjectsByTab(projects);
    return work.concat(orderedProjects);
  }

  function orderShowcase(files, tabId) {
    const byMedia = (list) => list.filter((file) => file.mp4).concat(list.filter((file) => !file.mp4));
    if (tabId !== 'all') return byMedia(files);
    const { work, projects } = workProjectPartition(files);
    return byMedia(work).concat(byMedia(projects));
  }

  function stillForProject(file) {
    if (file.poster) return file.poster;
    if (file.youtube) return `https://i.ytimg.com/vi/${encodeURIComponent(file.youtube)}/hqdefault.jpg`;
    return '';
  }

  function thumbForFile(file) {
    if (isCertification(file)) {
      const icon = ISSUER_ICONS[file.place];
      if (icon) {
        return `<span class="aaron-files__thumb aaron-files__thumb--cert"><img src="${esc(icon)}" alt="" aria-hidden="true"></span>`;
      }
      return `<span class="aaron-files__thumb aaron-files__thumb--file">${FILE_THUMB}</span>`;
    }
    const still = stillForProject(file);
    if (still) {
      return `<span class="aaron-files__thumb aaron-files__thumb--still"><img src="${esc(still)}" alt=""></span>`;
    }
    return `<span class="aaron-files__thumb aaron-files__thumb--folder">${FOLDER_THUMB}</span>`;
  }

  const PROJECT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const GITHUB_ICON = `<svg class="aaron-reel__github-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;
  const LIVE_ICON = `<svg class="aaron-reel__live-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 4.5h4.5V9"/><path d="M19.5 4.5 10.2 13.8"/><path d="M17.2 13.2V18a1.6 1.6 0 0 1-1.6 1.6H6A1.6 1.6 0 0 1 4.4 18V8.4A1.6 1.6 0 0 1 6 6.8h4.8"/></svg>`;

  function projectDateLabel(file) {
    if (file.sortDate != null) {
      const value = String(file.sortDate);
      const year = value.slice(0, 4);
      const month = PROJECT_MONTHS[parseInt(value.slice(4, 6), 10) - 1];
      return month ? `${month} ${year}` : year;
    }
    return file.date || '';
  }

  function githubMark(file) {
    if (!file.github) return '';
    return `<a class="aaron-reel__github" href="${esc(file.github)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(file.name)} on GitHub">${GITHUB_ICON}</a>`;
  }

  function liveMark(file) {
    if (!file.live) return '';
    return `<a class="aaron-reel__live" href="${esc(file.live)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(file.name)} live">${LIVE_ICON}</a>`;
  }

  function reelMedia(file) {
    const src = file.mp4;
    if (src) {
      const poster = file.poster ? ` poster="${esc(file.poster)}"` : '';
      return `<video class="aaron-reel__video" data-src="${esc(src)}"${poster} muted loop playsinline preload="none" disablepictureinpicture aria-hidden="true"></video>`;
    }
    const still = stillForProject(file);
    if (still) {
      return `<img class="aaron-reel__video aaron-reel__video--still" src="${esc(still)}" alt="" aria-hidden="true">`;
    }
    return `<span class="aaron-reel__fallback" aria-hidden="true"></span>`;
  }

  function reelCard(file) {
    const date = projectDateLabel(file);
    const tagline = file.tagline || '';
    const meta = (file.github || file.live || date)
      ? `<span class="aaron-reel__meta">${githubMark(file)}${liveMark(file)}${date ? `<span class="aaron-reel__year">${esc(date)}</span>` : ''}</span>`
      : '';
    const staticWork = isWorkEntry(file);
    const openAttrs = staticWork
      ? `class="aaron-reel__open aaron-reel__open--static" data-file="${esc(file.name)}"`
      : `class="aaron-reel__open" role="button" tabindex="0" data-file="${esc(file.name)}" data-project="${esc(file.id)}"`;
    return `
      <div class="aaron-reel${staticWork ? ' aaron-reel--static' : ''}">
        <div ${openAttrs}>
          <span class="aaron-reel__media">${reelMedia(file)}</span>
          <span class="aaron-reel__copy">
            <span class="aaron-reel__head">
              <span class="aaron-reel__name">${esc(file.name)}</span>
            </span>
            ${tagline ? `<span class="aaron-reel__tagline">${esc(tagline)}</span>` : ''}
          </span>
        </div>
        ${meta}
      </div>
    `;
  }

  function fileSortDate(file) {
    if (file.sortDate != null) return file.sortDate;
    const year = parseInt(file.date, 10);
    return Number.isFinite(year) ? year * 100 : 0;
  }

  let currentTab = 'all';
  let viewMode = 'icons';
  let sortMode = null;

  function layoutForTab(tabId) {
    return tabId === 'certifications' ? 'list' : viewMode;
  }
  let query = '';
  const tabHistory = ['all'];
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
    const certListOnly = currentTab === 'certifications';
    if (viewMenuLayout) viewMenuLayout.hidden = certListOnly;
    if (viewBtn) {
      const label = certListOnly ? 'Sort options' : 'View options';
      viewBtn.setAttribute('aria-label', label);
      viewBtn.title = label;
    }
    if (viewMenu) {
      viewMenu.setAttribute('aria-label', certListOnly ? 'Sort options' : 'View options');
    }
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

  function visibleFiles(tab, tabId) {
    let files = resolveFiles(tab.files);
    const needle = query.trim().toLowerCase();
    if (needle) {
      files = files.filter((file) => {
        const hay = [file.name, file.place, file.date, projectDateLabel(file)].filter(Boolean).join(' ').toLowerCase();
        return hay.includes(needle);
      });
    }
    if (sortMode === 'name') {
      const byName = (a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      files = tabId === 'all' ? orderAllCategory(files, byName) : files.slice().sort(byName);
    } else if (sortMode === 'date') {
      const byDate = (a, b) => fileSortDate(b) - fileSortDate(a) || a.name.localeCompare(b.name);
      files = tabId === 'all' ? orderAllCategory(files, byDate) : files.slice().sort(byDate);
    } else if (tabId === 'all') {
      files = orderAllCategory(files);
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
    const layout = layoutForTab(tabId);
    grid.classList.toggle('is-list', layout === 'list');
    expandGroupForTab(tabId);

    releaseAllReels();
    const files = visibleFiles(tab, tabId);
    const showcase = layout === 'icons' && files.length > 0 && files.every((file) => file.id && !isCertification(file));
    const shown = showcase ? orderShowcase(files, tabId) : files;
    grid.classList.toggle('is-reels', showcase);
    grid.innerHTML = shown.length
      ? shown.map((file) => {
          if (showcase) return reelCard(file);
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
          if (isWorkEntry(file)) {
            return `
              <div class="aaron-files__item aaron-files__item--static" data-file="${esc(file.name)}">
                ${inner}
              </div>
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
    bindReelPlayback();
  }

  function reduceReelMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  const MAX_REELS = 2;
  const reelSources = new WeakMap();

  // GitHub Pages answers Range with 200. WebKit will not start an mp4 without 206,
  // so those browsers play a blob they fetched themselves.
  function needsBufferedReel() {
    const ua = navigator.userAgent;
    const webkit = /Safari\//.test(ua) && !/Chrome\/|Chromium\/|Edg\/|OPR\//.test(ua);
    if (!webkit) return false;
    const host = location.hostname;
    return host === 'aarondutta.com' || host.endsWith('github.io');
  }

  function rectRatio(box, bounds) {
    const width = Math.min(box.right, bounds.right) - Math.max(box.left, bounds.left);
    const height = Math.min(box.bottom, bounds.bottom) - Math.max(box.top, bounds.top);
    const area = box.width * box.height;
    if (area <= 0 || width <= 0 || height <= 0) return 0;
    return (width * height) / area;
  }

  function viewportBounds() {
    return { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };
  }

  function releaseReel(video) {
    video.dataset.wantsPlay = '';
    video.pause();
    const generation = String(Number(video.dataset.loadGen || 0) + 1);
    video.dataset.loadGen = generation;
    if (!video.dataset.loaded && !video.dataset.objectUrl) return;
    const objectUrl = video.dataset.objectUrl;
    video.removeAttribute('src');
    try { video.load(); } catch (e) { /* ignore */ }
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    delete video.dataset.objectUrl;
    delete video.dataset.loaded;
    reelSources.delete(video);
  }

  function releaseAllReels() {
    grid.querySelectorAll('video').forEach((video) => releaseReel(video));
  }

  function pauseReels() {
    releaseAllReels();
  }

  function attachPlayableSource(video, src) {
    const existing = reelSources.get(video);
    if (existing && video.dataset.loaded) return existing;

    const generation = String(Number(video.dataset.loadGen || 0) + 1);
    video.dataset.loadGen = generation;
    video.dataset.loaded = '1';

    if (!needsBufferedReel()) {
      video.src = src;
      const ready = Promise.resolve();
      reelSources.set(video, ready);
      return ready;
    }

    const ready = fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.blob();
      })
      .then((blob) => {
        if (!video.isConnected || video.dataset.loadGen !== generation) return;
        const typed = blob.type ? blob : new Blob([blob], { type: 'video/mp4' });
        const url = URL.createObjectURL(typed);
        video.dataset.objectUrl = url;
        video.src = url;
      })
      .catch(() => {
        if (!video.isConnected || video.dataset.loadGen !== generation) return;
        video.src = src;
      });
    reelSources.set(video, ready);
    return ready;
  }

  function startPlayback(video) {
    if (video.dataset.wantsPlay !== '1' || reduceReelMotion() || isPopOpen() || !video.isConnected) return;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    if (!video.paused && video.readyState >= 2) return;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
  }

  function playReel(video) {
    if (reduceReelMotion() || isPopOpen()) {
      video.dataset.wantsPlay = '';
      video.pause();
      return;
    }
    video.dataset.wantsPlay = '1';
    if (!video.dataset.src) return;
    attachPlayableSource(video, video.dataset.src).then(() => startPlayback(video));
  }

  function syncReelPlayback() {
    const videos = [...grid.querySelectorAll('video[data-src]')];
    if (reduceReelMotion() || isPopOpen()) {
      videos.forEach((video) => {
        video.dataset.wantsPlay = '';
        video.pause();
      });
      return;
    }
    const gridBox = grid.getBoundingClientRect();
    const viewBox = viewportBounds();
    const ranked = videos
      .map((video) => ({ video, gridRatio: rectRatio(video.getBoundingClientRect(), gridBox) }))
      .filter((item) => item.gridRatio >= 0.55)
      .sort((a, b) => b.gridRatio - a.gridRatio);
    const keep = new Set(ranked.slice(0, MAX_REELS).map((item) => item.video));
    videos.forEach((video) => {
      const box = video.getBoundingClientRect();
      const gridRatio = rectRatio(box, gridBox);
      const viewRatio = rectRatio(box, viewBox);
      if (keep.has(video) && viewRatio >= 0.45) playReel(video);
      else if (!keep.has(video) && gridRatio < 0.2) releaseReel(video);
      else {
        video.dataset.wantsPlay = '';
        video.pause();
      }
    });
  }

  let reelSyncQueued = false;
  function scheduleReelSync() {
    if (reelSyncQueued) return;
    reelSyncQueued = true;
    requestAnimationFrame(() => {
      reelSyncQueued = false;
      syncReelPlayback();
    });
  }

  function bindReelPlayback() {
    const videos = grid.querySelectorAll('video[data-src]');
    if (!videos.length || reduceReelMotion()) return;
    videos.forEach((video) => {
      if (video.dataset.reelBound) return;
      video.dataset.reelBound = '1';
      video.addEventListener('canplay', () => startPlayback(video));
      video.addEventListener('loadeddata', () => startPlayback(video));
    });
    scheduleReelSync();
    requestAnimationFrame(() => requestAnimationFrame(scheduleReelSync));
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
    if (item.hasAttribute('data-view')) {
      if (currentTab === 'certifications') return;
      viewMode = item.getAttribute('data-view');
    }
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
      const objectUrl = el.dataset.objectUrl;
      el.removeAttribute('src');
      try { el.load(); } catch (e) { /* ignore */ }
      if (objectUrl) URL.revokeObjectURL(objectUrl);
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
    bindReelPlayback();
  }

  function openProject(id) {
    const project = PROJECTS[id];
    if (!project || !pop || !popTitle || !popDesc || !popStack) return;

    pauseReels();
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
      const playDemo = () => {
        if (!video.isConnected) return;
        video.muted = true;
        video.defaultMuted = true;
        const playAttempt = video.play();
        if (playAttempt && typeof playAttempt.catch === 'function') playAttempt.catch(() => {});
      };
      video.addEventListener('canplay', playDemo);
      attachPlayableSource(video, project.mp4).then(playDemo);
    } else if (popDemo && project.youtube) {
      popDemo.classList.add('has-video');
      const still = stillForProject(project);
      if (still) popDemo.style.backgroundImage = `url("${esc(still)}")`;
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

  grid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const item = e.target.closest('.aaron-reel__open[data-project]');
    if (!item) return;
    e.preventDefault();
    playFolderThenOpen(item, item.getAttribute('data-project'));
  });

  grid.addEventListener('scroll', scheduleReelSync, { passive: true });
  window.addEventListener('scroll', scheduleReelSync, { passive: true });
  window.addEventListener('resize', scheduleReelSync);
  window.addEventListener('pageshow', scheduleReelSync);

  const preloaderEl = document.getElementById('aaron-preloader');
  if (preloaderEl) {
    const preloaderWatch = new MutationObserver(() => {
      if (!preloaderEl.classList.contains('is-hidden')) return;
      scheduleReelSync();
      requestAnimationFrame(() => requestAnimationFrame(scheduleReelSync));
      preloaderWatch.disconnect();
    });
    preloaderWatch.observe(preloaderEl, { attributes: true, attributeFilter: ['class'] });
  }

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

  setSidebarHidden(true);
  renderTab('all');
})();
