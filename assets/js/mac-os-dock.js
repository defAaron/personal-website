/**
 * cmd-dock + tilda-bar (inspired by marco.fyi)
 */
(function () {
  const mount = document.getElementById('mac-dock');
  if (!mount) return;

  const APPS = [
    {
      id: 'dia',
      name: 'connect with me',
      icon: '/assets/dock/dia.png',
      accent: '#e6b325',
      accentBg: '#fff1c7',
      tabActiveBg: '#fff8e3',
    },
    {
      id: 'claude',
      name: 'resume',
      icon: '/assets/dock/claude.png',
      accent: '#d97757',
      accentBg: '#fdeee8',
      tabActiveBg: '#fff5f0',
    },
    {
      id: 'notes',
      name: 'awards',
      icon: '/assets/dock/notes.png',
      accent: '#f5c518',
      accentBg: '#fff4c2',
      tabActiveBg: '#fff9dc',
    },
    {
      id: 'notion',
      name: 'writing',
      icon: '/assets/dock/notion.webp',
      accent: '#6366f1',
      accentBg: '#dbddff',
      tabActiveBg: '#eff0ff',
    },
    {
      id: 'spotify',
      name: 'favorite songs',
      icon: '/assets/dock/spotify.svg',
      accent: '#1ed760',
      accentBg: '#dcfce7',
      tabActiveBg: '#ecfdf3',
    },
  ];

  const APP_TABS = {
    dia: [
      { id: 'dia-2', title: 'LinkedIn', subtitle: '/in/aaron-dutta', icon: '/assets/dock/linkedin.svg', href: 'https://linkedin.com/in/aaron-dutta', external: true, copy: true },
      { id: 'dia-4', title: 'X', subtitle: '/theaar0ndutta', icon: '/assets/dock/x.svg', href: 'https://x.com/theaar0ndutta', external: true, copy: true },
      { id: 'dia-3', title: 'GitHub', subtitle: '/defAaron', icon: '/assets/dock/github.svg', href: 'https://github.com/defAaron', external: true, copy: true },
      { id: 'dia-mail', title: 'Email', subtitle: 'aaron.dutta@uwaterloo.ca', icon: '/assets/dock/email.svg', href: 'mailto:aaron.dutta@uwaterloo.ca', external: false, copy: true, copyValue: 'aaron.dutta@uwaterloo.ca' },
      { id: 'dia-6', title: 'Cal.com', subtitle: '/aaron-dutta', icon: '/assets/dock/cal.svg', href: 'https://cal.com/aaron-dutta', external: true, copy: true },
    ],
    notion: [
      {
        id: 'notion-1',
        title: 'creation in 2026',
        subtitle: 'oct 10, 2026',
        icon: '/assets/dock/notion-page.svg',
        href: '#',
        external: false,
        note: [
          'the crowd lines up behind the door that leads to success 90% of the time',
          'success waits behind the door that the crowd is lined up for 10% of the time',
          { type: 'lead', text: '**what this means:**' },
          {
            type: 'list',
            items: [
              'following the crowd is almost never a bad idea. attention and hype is never all for nothing, especially in an environment where knowledge is distributed, research is a mindset, and ambition is a lifestyle',
              'to be mindful of one’s own capabilities and to control your focus is a greater power.',
              'side-note: self-control is a rather blunt and ambiguous term, but representing this notion as a single word is too thought-provoking for me. I’m frustrated to spend so much time on vocabulary during a flow state of writing.',
              'be creative, be original, but **do not FORCE yourself to be original**. it’s completely fine if you’ve thought about building something, writing something, or creating anything, but it’s already been done. chances are that your passion, determination, skills, and the journey you take while creating the product will differentiate your end result from everything else. along with this, you will now be <u>carrying a story</u> to tell to people of what/why/when/where/how you’ve created.',
              'creation does not necessarily have to be invention. but invention also does not necessarily have to be completely new. when I hear “necessity is the mother of invention,” I think “what is necessity assigned to? Is it to the world? Is it to all the people? Is it to a specific group of people, or to a singular person?” But recently, I’ve taken a more internal view to this quote. That person just might be **you**. It might help you, not in a physical/practical way, like people would expect. Maybe it just helped you gain a stronger understanding of an environment, a person, an idea, or the world in general.',
              'sometimes the problem behind a motivation is obscured. sometimes you will not be able to concretely define what you wish to solve. as an engineer, this might be one of the most distrurbing thoughts you can have, because a key aspect of engineering is hyperfixating the workflow on that problem, and optimizing your process and build plan to be as efficient as possible. how are we to define a plan when we do not even know what it is for? of course, we know what it will do, but in an age where slop is getting more and more prevalent in the field of creativity, I feel a genuine fear of my creations leaning towards being in that pile of garbage. the solution for this is just to create, evaluate, and repeat. challenge the meaning of direction. a little analogy (that might only make sense in my head) could be the following. imagine your goal is to journey to the North. N 1˚ E still means you are moving North. It also means you are moving East. East may provide additional benefits, or may hinder your project. But it is better than moving South.',
            ],
          },
        ],
      },
      {
        id: 'notion-3',
        title: 'reading list',
        subtitle: 'oct 12, 2026',
        icon: '/assets/dock/notion-page.svg',
        href: '#',
        external: false,
        note: [
          { type: 'lead', text: '**<u>books:</u>**' },
          {
            type: 'list',
            items: [
              'designing data-intensive applications - martin kleppmann',
              'an insiders guide to system design interview - alex xu',
            ],
          },
          { type: 'lead', text: '**<u>papers:</u>**' },
          {
            type: 'list',
            items: [
              'reinforcement learning with human feedback (rlhf)',
              'mixture of experts (moe)',
              'flashattention',
              'rotary position embedding (rope)',
              'kv cache',
              'chain of thought prompting',
              'ReAct',
              'graphrag',
              'a2a protocols',
              'contrastive language-image pre-training (clip)',
              'bootstrapping language-image pre-training (blip)',
            ],
          },
        ],
      },
    ],
    notes: [
      { id: 'notes-1', title: 'Winner', subtitle: 'RescueHacks 2026', icon: '/assets/dock/notes-page.svg', href: '#', external: false },
      { id: 'notes-2', title: '2nd Place', subtitle: 'KYHacks 2026', icon: '/assets/dock/notes-page.svg', href: '#', external: false },
      { id: 'notes-3', title: '3rd Best Security Hack', subtitle: 'STEMist Hacks 2026', icon: '/assets/dock/notes-page.svg', href: '#', external: false },
      { id: 'notes-4', title: '1st Place', subtitle: 'STEMMINDS Hacks 2026', icon: '/assets/dock/notes-page.svg', href: '#', external: false },
      { id: 'notes-5', title: 'Top 70/16,000', subtitle: 'Fermat 2025', icon: '/assets/dock/notes-page.svg', href: '#', external: false },
      { id: 'notes-6', title: 'Top 400/6,150', subtitle: 'Hypatia 2025', icon: '/assets/dock/notes-page.svg', href: '#', external: false },
      { id: 'notes-7', title: 'Top 17%', subtitle: 'Euclid, Chem13, Sir Isaac Newton 2025', icon: '/assets/dock/notes-page.svg', href: '#', external: false },
      { id: 'notes-8', title: '2x Gold Winner', subtitle: 'IMFC 2025', icon: '/assets/dock/notes-page.svg', href: '#', external: false },
    ],
    spotify: [
      { id: 'spotify-1', title: 'Toronto 2014', subtitle: 'Daniel Caesar', emoji: '1', href: '#', external: false, audio: '/assets/music/toronto2014.mp3', backgroundArt: '/assets/images/toronto-2014.png' },
      { id: 'spotify-2', title: 'Who Knows', subtitle: 'Daniel Caesar', emoji: '2', href: '#', external: false, audio: '/assets/music/who-knows.mp3', backgroundArt: '/assets/images/who-knows.png' },
      { id: 'spotify-3', title: 'Piano Concerto No. 2 in C Minor, Op. 18: II. Adagio sostenuto', subtitle: 'Sergei Rachmaninoff', emoji: '3', href: '#', external: false, audio: '/assets/music/rach.mp3', backgroundArt: '/assets/images/adagio-sostenuto.png' },
    ],
    claude: [
      { id: 'claude-1', title: 'hey claude, print my resume', subtitle: 'click here to view', emoji: '💬', href: '/assets/docs/resume.pdf', external: true },
    ],
  };

  let activeAppId = 'dia';
  let activeTabId = APP_TABS.dia[0].id;

  const shell = document.createElement('div');
  shell.className = 'mac-dock-shell';

  const tabPanel = document.createElement('div');
  tabPanel.className = 'mac-dock-tabs';
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

  const caretSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  caretSvg.setAttribute('viewBox', '0 0 234 72');
  caretSvg.setAttribute('fill', 'none');
  caretSvg.setAttribute('aria-hidden', 'true');

  const caretFill = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  caretFill.setAttribute('class', 'mac-dock-tabs__caret-fill');
  caretFill.setAttribute('d', 'M104.733 54.8038L81.1269 31.1977C69.6131 19.6839 63.8562 13.927 57.138 9.81008C51.1816 6.16001 44.6878 3.4702 37.8951 1.8394C30.2334 0 22.0919 0 5.80899 0H227.194C210.911 0 202.769 0 195.108 1.8394C188.315 3.4702 181.821 6.16001 175.865 9.81008C169.147 13.927 163.39 19.6839 151.876 31.1977L128.27 54.8038C121.77 61.3034 111.233 61.3033 104.733 54.8038Z');

  const caretBorder = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  caretBorder.setAttribute('class', 'mac-dock-tabs__caret-border');
  caretBorder.setAttribute('d', 'M227.194 8.32153C210.515 8.32153 203.532 8.37501 197.05 9.931C191.107 11.358 185.425 13.7115 180.213 16.9053C174.53 20.388 169.554 25.2881 157.76 37.0819L134.154 60.6881C124.405 70.4373 108.598 70.4373 98.8488 60.688L75.2427 37.0819C63.4488 25.288 58.4731 20.388 52.79 16.9053C47.5781 13.7115 41.8961 11.358 35.9524 9.931C29.4713 8.37501 22.488 8.32153 5.80899 8.32153H0V0H5.80899C22.0919 0 30.2334 0 37.8951 1.8394C44.6878 3.4702 51.1816 6.16001 57.138 9.81008C63.8562 13.927 69.6131 19.6839 81.1269 31.1977L104.733 54.8038C111.233 61.3033 121.77 61.3034 128.27 54.8038L151.876 31.1977C163.39 19.6839 169.147 13.927 175.865 9.81008C181.821 6.16001 188.315 3.4702 195.108 1.8394C202.769 0 210.911 0 227.194 0H233.003V8.32153H227.194Z');

  caretSvg.append(caretFill, caretBorder);
  tabCaret.appendChild(caretSvg);

  tabPanel.append(tabHeader, tabRow, tabCaret);

  const dock = document.createElement('div');
  dock.className = 'mac-dock';
  dock.setAttribute('role', 'toolbar');
  dock.setAttribute('aria-label', 'Application dock');

  const iconStrip = document.createElement('div');
  iconStrip.className = 'mac-dock__icons';
  dock.appendChild(iconStrip);

  const trackAudio = document.createElement('audio');
  const musicVolume = 0.7;
  trackAudio.className = 'mac-dock-player';
  trackAudio.preload = 'auto';
  trackAudio.volume = musicVolume;
  trackAudio.hidden = true;
  trackAudio.setAttribute('aria-hidden', 'true');
  let musicAudioContext;
  let activeSpotifyTab = APP_TABS.spotify[0];
  let playingTabId = null;
  let playRequest;
  let loadedAudioPath;
  let seekableAudioUrl;
  let seekDownload;
  let seekPreview = null;
  let pendingSeek = null;
  let currentArtwork = '';

  const playerEl = document.createElement('div');
  playerEl.className = 'mac-dock-now';
  playerEl.hidden = true;
  playerEl.setAttribute('role', 'group');
  playerEl.setAttribute('aria-label', 'Now playing');

  const artworkCanvas = document.createElement('canvas');
  artworkCanvas.className = 'mac-dock-now__distortion';
  artworkCanvas.setAttribute('aria-hidden', 'true');
  const artworkContext = artworkCanvas.getContext('2d');
  const artworkImage = new Image();
  const artworkReducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const artworkTrailDelay = 110;
  const artworkTrailLifetime = 320;
  const artworkSparkleLifetime = 240;
  let artworkTrail = [];
  let artworkSparkles = [];
  let previousArtworkPointer = null;
  let lastArtworkSparkle = -Infinity;
  let artworkFrame = 0;

  const playerBody = document.createElement('div');
  playerBody.className = 'mac-dock-now__body';

  const playerTitle = document.createElement('p');
  playerTitle.className = 'mac-dock-now__title';

  const playerArtist = document.createElement('p');
  playerArtist.className = 'mac-dock-now__artist';

  const playerProgress = document.createElement('input');
  playerProgress.type = 'range';
  playerProgress.className = 'mac-dock-now__progress';
  playerProgress.setAttribute('aria-label', 'Playback progress');
  playerProgress.min = '0';
  playerProgress.max = '0';
  playerProgress.step = 'any';
  playerProgress.value = '0';
  playerProgress.disabled = true;

  const playerTrack = document.createElement('span');
  playerTrack.className = 'mac-dock-now__track';
  const playerFill = document.createElement('span');
  playerFill.className = 'mac-dock-now__fill';
  playerTrack.setAttribute('aria-hidden', 'true');
  playerTrack.appendChild(playerFill);

  const playerTimeline = document.createElement('div');
  playerTimeline.className = 'mac-dock-now__timeline';
  playerTimeline.append(playerTrack, playerProgress);

  const playerTimes = document.createElement('div');
  playerTimes.className = 'mac-dock-now__times';
  const playerElapsed = document.createElement('span');
  playerElapsed.textContent = '0:00';
  const playerDuration = document.createElement('span');
  playerDuration.textContent = '—';
  playerTimes.append(playerElapsed, playerDuration);

  const playerStatus = document.createElement('p');
  playerStatus.className = 'mac-dock-now__status';
  playerStatus.setAttribute('role', 'status');

  function formatTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return '0:00';
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  function glyph(path) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    shape.setAttribute('d', path);
    shape.setAttribute('fill', 'none');
    shape.setAttribute('stroke', 'currentColor');
    shape.setAttribute('stroke-width', '2.4');
    shape.setAttribute('stroke-linecap', 'round');
    shape.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(shape);
    return svg;
  }

  function controlButton(label, icon) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mac-dock-now__btn';
    button.setAttribute('aria-label', label);
    button.appendChild(icon);
    return button;
  }

  const playerPrev = controlButton('Previous song', glyph('M6.5 5v14M18 6.8 9.5 12l8.5 5.2V6.8Z'));
  const playerIconPlay = glyph('m8.5 6.5 9 5.5-9 5.5v-11Z');
  const playerIconPause = glyph('M8.5 6v12M15.5 6v12');
  playerIconPause.setAttribute('hidden', '');
  const playerPlay = controlButton('Play', playerIconPlay);
  playerPlay.classList.add('mac-dock-now__btn--play');
  playerPlay.appendChild(playerIconPause);
  const playerNext = controlButton('Next song', glyph('M17.5 5v14M6 6.8l8.5 5.2L6 17.2V6.8Z'));

  const playerControls = document.createElement('div');
  playerControls.className = 'mac-dock-now__controls';
  playerControls.append(playerPrev, playerPlay, playerNext);

  const waveform = document.createElement('div');
  waveform.className = 'mac-dock-now__waveform';
  waveform.setAttribute('aria-hidden', 'true');
  const waveformBars = Array.from({ length: 10 }, (_, index) => {
    const bar = document.createElement('span');
    bar.style.height = `${7 + Math.cos(index * 0.55)}px`;
    bar.style.animationDelay = `${(index - 9) * 45}ms`;
    return bar;
  });
  waveform.append(...waveformBars);

  playerBody.append(playerTitle, playerArtist, playerControls, playerTimeline, playerTimes, playerStatus);
  playerEl.append(artworkCanvas, playerBody, waveform);
  tabPanel.insertBefore(playerEl, tabRow);

  function drawArtworkDistortion(now) {
    artworkFrame = 0;
    artworkContext.resetTransform();
    artworkContext.clearRect(0, 0, artworkCanvas.width, artworkCanvas.height);
    artworkTrail = artworkTrail.filter(({ time }) => now - time < artworkTrailDelay + artworkTrailLifetime);
    artworkSparkles = artworkSparkles.filter(({ time }) => now - time < artworkSparkleLifetime);
    if (!artworkTrail.length && !artworkSparkles.length) return;

    const { width, height } = playerEl.getBoundingClientRect();
    if (playerEl.hidden || !width || !height) return;

    const density = window.devicePixelRatio || 1;
    const canvasWidth = Math.ceil(width * density);
    const canvasHeight = Math.ceil(height * density);
    if (artworkCanvas.width !== canvasWidth) artworkCanvas.width = canvasWidth;
    if (artworkCanvas.height !== canvasHeight) artworkCanvas.height = canvasHeight;
    artworkContext.setTransform(canvasWidth / width, 0, 0, canvasHeight / height, 0, 0);
    artworkContext.imageSmoothingEnabled = false;

    if (artworkImage.complete && artworkImage.naturalWidth) {
      drawArtworkTrail(now, width, height);
    }
    artworkContext.fillStyle = '#fff';
    for (const sparkle of artworkSparkles) {
      const age = Math.max(0, now - sparkle.time) / artworkSparkleLifetime;
      artworkContext.globalAlpha = 0.9 * (1 - age) ** 2;
      artworkContext.fillRect(
        Math.round(sparkle.x + sparkle.driftX * age),
        Math.round(sparkle.y + sparkle.driftY * age),
        sparkle.size,
        sparkle.size,
      );
    }
    artworkContext.globalAlpha = 1;
    requestArtworkDistortion();
  }

  function drawArtworkTrail(now, width, height) {
    const imageWidth = artworkImage.naturalWidth;
    const imageHeight = artworkImage.naturalHeight;
    const scale = Math.max(width / imageWidth, height / imageHeight);
    const position = parseFloat(getComputedStyle(playerEl).backgroundPositionX) / 100;
    const artX = (width - imageWidth * scale) * position;
    const artY = (height - imageHeight * scale) / 2;
    const tile = 5;
    const sampleSize = tile / scale;
    const columns = Math.ceil(width / tile);
    const tiles = new Map();

    // Combine overlapping samples so each tile fades once, even when the trail doubles back.
    for (const { x, y, time } of artworkTrail) {
      const age = now - time - artworkTrailDelay;
      if (age < 0) continue;

      const strength = 1 - age / artworkTrailLifetime;
      const radius = 5 + 7 * strength;
      const startColumn = Math.max(0, Math.floor((x - radius) / tile));
      const startRow = Math.max(0, Math.floor((y - radius) / tile));
      for (let row = startRow; row * tile < Math.min(y + radius, height); row++) {
        for (let column = startColumn; column * tile < Math.min(x + radius, width); column++) {
          const distance = Math.hypot((column + 0.5) * tile - x, (row + 0.5) * tile - y);
          if (distance >= radius) continue;
          const alpha = strength * Math.min(1, (radius - distance) / tile);
          const key = row * columns + column;
          tiles.set(key, Math.max(alpha, tiles.get(key) ?? 0));
        }
      }
    }

    for (const [key, alpha] of tiles) {
      const column = key % columns;
      const row = Math.floor(key / columns);
      const tileX = column * tile;
      const tileY = row * tile;
      const shiftX = ((column * 3 + row * 7) % 5 - 2) * 3;
      const shiftY = ((column * 7 + row * 2) % 3 - 1) * 3;
      const sampleX = Math.max(0, Math.min(imageWidth - sampleSize, (tileX - artX + shiftX) / scale));
      const sampleY = Math.max(0, Math.min(imageHeight - sampleSize, (tileY - artY + shiftY) / scale));
      artworkContext.globalAlpha = alpha;
      artworkContext.drawImage(artworkImage, sampleX, sampleY, sampleSize, sampleSize, tileX, tileY, tile, tile);
    }
  }

  function requestArtworkDistortion() {
    if (artworkContext && !artworkFrame && (artworkTrail.length || artworkSparkles.length)) {
      artworkFrame = requestAnimationFrame(drawArtworkDistortion);
    }
  }

  function updateArtworkPointer(event) {
    if (!artworkContext || event.pointerType !== 'mouse' || artworkReducedMotion.matches) return;

    const { left, top, width, height } = playerEl.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    if (x < 0 || y < 0 || x >= width || y >= height) return;

    const time = performance.now();
    const previous = previousArtworkPointer;
    const distance = previous ? Math.hypot(x - previous.x, y - previous.y) : 0;
    if (previous && distance < 4) return;
    previousArtworkPointer = { x, y, time };

    if (previous && time - previous.time < 80) {
      const steps = Math.min(64, Math.ceil(distance / 6));
      for (let step = 1; step < steps; step++) {
        const fraction = step / steps;
        artworkTrail.push({
          x: previous.x + (x - previous.x) * fraction,
          y: previous.y + (y - previous.y) * fraction,
          time: previous.time + (time - previous.time) * fraction,
        });
      }
    }
    artworkTrail.push(previousArtworkPointer);

    if (time - lastArtworkSparkle >= 34) {
      lastArtworkSparkle = time;
      artworkSparkles.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        driftX: (Math.random() - 0.5) * 10,
        driftY: -3 - Math.random() * 6,
        size: Math.random() < 0.25 ? 3 : 2,
        time,
      });
    }
    requestArtworkDistortion();
  }

  function clearArtworkDistortion() {
    previousArtworkPointer = null;
    artworkTrail = [];
    artworkSparkles = [];
    lastArtworkSparkle = -Infinity;
    if (artworkFrame) cancelAnimationFrame(artworkFrame);
    artworkFrame = 0;
    artworkContext?.resetTransform();
    artworkContext?.clearRect(0, 0, artworkCanvas.width, artworkCanvas.height);
  }

  playerEl.addEventListener('pointermove', updateArtworkPointer);
  playerEl.addEventListener('pointerleave', () => { previousArtworkPointer = null; });
  playerEl.addEventListener('pointercancel', clearArtworkDistortion);
  artworkReducedMotion.addEventListener('change', clearArtworkDistortion);

  playerProgress.addEventListener('input', () => {
    seekPreview = playerProgress.valueAsNumber;
    syncPlayerTimes();
  });

  playerProgress.addEventListener('change', () => seekTrack(playerProgress.valueAsNumber));
  playerProgress.addEventListener('pointercancel', () => {
    seekPreview = null;
    syncPlayerTimes();
  });

  playerProgress.addEventListener('keydown', (event) => {
    if (playerProgress.disabled) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const delta = event.key === 'ArrowRight' ? 5 : -5;
    seekTrack(playerProgress.valueAsNumber + delta);
  });

  playerPrev.addEventListener('click', () => stepSpotify(-1));
  playerPlay.addEventListener('click', () => toggleTrack(activeSpotifyTab));
  playerNext.addEventListener('click', () => stepSpotify(1));

  shell.append(tabPanel, dock, trackAudio);
  mount.appendChild(shell);

  trackAudio.addEventListener('ended', () => {
    if (trackAudio.ended && playingTabId === activeSpotifyTab.id) stepSpotify(1);
  });

  for (const event of ['loadedmetadata', 'durationchange', 'canplay', 'timeupdate', 'progress', 'seeked']) {
    trackAudio.addEventListener(event, syncPlayerTimes);
  }
  trackAudio.addEventListener('error', () => syncPlayer());

  function seekTrack(time) {
    if (playerProgress.disabled || !Number.isFinite(time)) return;
    seekPreview = null;
    pendingSeek = Math.max(0, Math.min(time, trackAudio.duration));
    syncPlayerTimes();
    if (pendingSeek !== null && !seekableAudioUrl && !seekDownload) loadSeekableAudio();
  }

  async function loadSeekableAudio() {
    // Download a local copy when the server cannot serve the requested byte range.
    const request = new AbortController();
    seekDownload = request;
    try {
      const response = await fetch(loadedAudioPath, { signal: request.signal });
      if (!response.ok) throw new Error('Audio download failed');
      const audio = await response.blob();
      if (seekDownload !== request || pendingSeek === null) return;

      seekableAudioUrl = URL.createObjectURL(audio);
      trackAudio.src = seekableAudioUrl;
      trackAudio.currentTime = pendingSeek;
      if (playingTabId === activeSpotifyTab.id) startTrackAudio();
    } catch {
      if (seekDownload !== request || pendingSeek === null) return;
      pendingSeek = null;
      playerStatus.textContent = 'Unable to seek in this track.';
      syncPlayerTimes();
    } finally {
      if (seekDownload === request) seekDownload = null;
    }
  }

  function syncPlayerTimes() {
    const duration = trackAudio.duration;
    const canSeek = Number.isFinite(duration) && duration > 0 && !trackAudio.error;
    if (canSeek && pendingSeek !== null) {
      const target = Math.min(pendingSeek, duration);
      const seekable = trackAudio.seekable;
      for (let index = 0; index < seekable.length; index++) {
        if (target < seekable.start(index) || target > seekable.end(index) + 0.05) continue;
        pendingSeek = null;
        trackAudio.currentTime = target;
        break;
      }
    }
    if (playerEl.hidden) return;

    const current = canSeek ? Math.min(trackAudio.currentTime, duration) : 0;
    const sliderTime = canSeek ? Math.min(seekPreview ?? pendingSeek ?? current, duration) : 0;
    const fraction = canSeek ? sliderTime / duration : 0;
    playerProgress.disabled = !canSeek;
    playerProgress.max = canSeek ? String(duration) : '0';
    if (seekPreview === null) playerProgress.value = String(sliderTime);
    playerProgress.setAttribute('aria-valuetext', canSeek ? `${formatTime(sliderTime)} of ${formatTime(duration)}` : 'Unavailable');
    playerElapsed.textContent = formatTime(current);
    playerDuration.textContent = canSeek ? formatTime(duration) : '—';
    playerFill.style.width = `${fraction * 100}%`;
    waveformBars.forEach((bar, index) => {
      bar.classList.toggle('is-played', (index + 0.5) / waveformBars.length <= fraction);
    });
  }

  function syncPlayerArtwork(artwork, direction) {
    if (artwork === currentArtwork) return;
    const previousArtwork = currentArtwork;
    currentArtwork = artwork;
    playerEl.style.setProperty('--player-artwork', `url("${artwork}")`);
    clearArtworkDistortion();
    artworkImage.src = artwork;

    if (!previousArtwork) {
      for (const track of APP_TABS.spotify) {
        if (track.backgroundArt === artwork) continue;
        const preload = new Image();
        preload.src = track.backgroundArt;
      }
      return;
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const outgoingArt = document.createElement('div');
    outgoingArt.className = 'mac-dock-now__outgoing-art';
    outgoingArt.setAttribute('aria-hidden', 'true');
    outgoingArt.style.setProperty('--player-artwork', `url("${previousArtwork}")`);
    artworkCanvas.after(outgoingArt);

    // Advance the edge in square steps, with each row clearing at a different rate.
    const rows = [0.08, 0.18, 0.03, 0.14, 0, 0.11, 0.22, 0.06, 0.15, 0.02, 0.19, 0.09];
    const edge = direction > 0 ? 100 : 0;
    const frames = Array.from({ length: 13 }, (_, frame) => {
      const points = rows.flatMap((delay, row) => {
        const progress = Math.max(0, Math.min(1, (frame / 12 - delay) / 0.78));
        const pixels = Math.round(progress * 64) / 64 * 100;
        const x = direction > 0 ? pixels : 100 - pixels;
        return [`${x}% ${row / rows.length * 100}%`, `${x}% ${(row + 1) / rows.length * 100}%`];
      });
      points.push(`${edge}% 100%`, `${edge}% 0%`);
      return { clipPath: `polygon(${points.join(', ')})`, easing: 'steps(3, end)' };
    });
    const dissolve = outgoingArt.animate(frames, { duration: 560, easing: 'ease-in-out', fill: 'forwards' });
    dissolve.onfinish = () => outgoingArt.remove();
  }

  function syncPlayer(direction = 1) {
    const tab = activeSpotifyTab;
    if (loadedAudioPath !== tab.audio) {
      loadedAudioPath = tab.audio;
      seekDownload?.abort();
      seekDownload = null;
      seekPreview = null;
      pendingSeek = null;
      trackAudio.src = tab.audio;
      if (seekableAudioUrl) URL.revokeObjectURL(seekableAudioUrl);
      seekableAudioUrl = null;
    }
    if (playerEl.hidden) return;
    playerTitle.textContent = tab.title;
    playerTitle.title = tab.title;
    playerArtist.textContent = tab.subtitle || '';
    syncPlayerArtwork(tab.backgroundArt, direction);
    const playing = playingTabId === tab.id;
    playerIconPlay.toggleAttribute('hidden', playing);
    playerIconPause.toggleAttribute('hidden', !playing);
    playerEl.classList.toggle('is-playing', playing);
    playerPlay.setAttribute('aria-label', playing ? `Pause ${tab.title}` : `Play ${tab.title}`);
    playerStatus.textContent = trackAudio.error ? 'Track unavailable.' : '';
    syncPlayerTimes();
  }

  function playTab(tab, direction = 1) {
    activeSpotifyTab = tab;
    playingTabId = tab.id;
    syncPlayer(direction);

    // Apply gain where the browser leaves the media element volume fixed.
    if (trackAudio.volume !== musicVolume && !musicAudioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        musicAudioContext = new AudioContext();
        const gain = musicAudioContext.createGain();
        gain.gain.value = musicVolume;
        musicAudioContext.createMediaElementSource(trackAudio).connect(gain);
        gain.connect(musicAudioContext.destination);
      }
    }
    if (musicAudioContext && musicAudioContext.state !== 'running') {
      musicAudioContext.resume().catch(() => {});
    }

    startTrackAudio();
  }

  function startTrackAudio() {
    const tab = activeSpotifyTab;
    const request = trackAudio.play();
    playRequest = request;
    request.catch(() => {
      if (playRequest !== request || playingTabId !== tab.id) return;
      playingTabId = null;
      syncPlayer();
    });
  }

  function toggleTrack(tab) {
    if (playingTabId === tab.id) {
      trackAudio.pause();
      playingTabId = null;
      syncPlayer();
      return;
    }
    playTab(tab);
  }

  function showSpotifyTab(tab, autoplay, direction) {
    if (autoplay) {
      playTab(tab, direction);
      return;
    }
    activeSpotifyTab = tab;
    trackAudio.pause();
    playingTabId = null;
    syncPlayer(direction);
  }

  function stepSpotify(direction) {
    const tabs = APP_TABS.spotify;
    const index = tabs.indexOf(activeSpotifyTab);
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    showSpotifyTab(next, direction > 0 || playingTabId === tabs[index].id, direction);
  }

  const iconEls = APPS.map((app) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mac-dock__icon';
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
    btn.addEventListener('click', () => {
      selectApp(app.id);
    });
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

  function syncMirrorState() {
    updateActiveIconStyles();
  }

  function updateAppHeader() {
    const app = getActiveApp();
    tabHeader.replaceChildren();
    if (!app) return;

    const img = document.createElement('img');
    img.className = 'mac-dock-tabs__header-icon';
    img.src = app.icon;
    img.alt = '';
    img.width = 18;
    img.height = 18;
    img.draggable = false;

    const name = document.createElement('span');
    name.className = 'mac-dock-tabs__header-name';
    name.textContent = app.name;

    tabHeader.append(img, name);
  }

  function appendTabIcon(container, tab) {
    if (tab.audio && playingTabId === tab.id) {
      container.classList.add('mac-dock-tab__icon--playing');
      return;
    }
    if (tab.icon) {
      const img = document.createElement('img');
      img.className = 'mac-dock-tab__icon-img';
      img.src = tab.icon;
      img.alt = '';
      img.width = 16;
      img.height = 16;
      img.draggable = false;
      container.appendChild(img);
      return;
    }
    container.textContent = tab.emoji || '';
    if (/^\d+$/.test(tab.emoji || '')) {
      container.classList.add('mac-dock-tab__icon--index');
    }
  }

  function scrollActiveTabIntoView() {
    const activeCard = tabRow.querySelector('.mac-dock-tab-wrap.is-active, .mac-dock-tab.is-active');
    if (!activeCard) return;

    // Content fits: no horizontal scroll needed (and CSS centers the row).
    if (tabRow.scrollWidth <= tabRow.clientWidth) {
      tabRow.scrollLeft = 0;
      return;
    }

    const cardLeft = activeCard.offsetLeft;
    const cardRight = cardLeft + activeCard.offsetWidth;
    const viewLeft = tabRow.scrollLeft;
    const viewRight = viewLeft + tabRow.clientWidth;

    if (cardLeft < viewLeft) {
      tabRow.scrollLeft = Math.max(0, cardLeft);
    } else if (cardRight > viewRight) {
      tabRow.scrollLeft = cardRight - tabRow.clientWidth;
    }
  }

  function createCopyButton(url, label) {
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'mac-dock-tab__copy';
    const isEmail = String(url).includes('@') && !String(url).startsWith('http');
    const copyNoun = isEmail ? 'address' : 'link';
    copyBtn.setAttribute('aria-label', `Copy ${label} ${copyNoun}`);
    copyBtn.title = isEmail ? 'Copy email' : 'Copy link';

    const img = document.createElement('img');
    img.src = '/assets/icons/copy.svg';
    img.alt = '';
    img.width = 12;
    img.height = 12;
    img.draggable = false;
    copyBtn.appendChild(img);

    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const done = () => {
        copyBtn.classList.add('is-copied');
        copyBtn.title = 'Copied!';
        copyBtn.setAttribute('aria-label', `Copied ${label} ${copyNoun}`);
        window.clearTimeout(copyBtn._copyTimer);
        copyBtn._copyTimer = window.setTimeout(() => {
          copyBtn.classList.remove('is-copied');
          copyBtn.title = isEmail ? 'Copy email' : 'Copy link';
          copyBtn.setAttribute('aria-label', `Copy ${label} ${copyNoun}`);
        }, 1500);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(() => {});
      }
    });

    return copyBtn;
  }

  function renderTabPanel() {
    const tabs = APP_TABS[activeAppId] || [];
    applyAccentVars();
    updateAppHeader();
    const isPlayer = activeAppId === 'spotify';
    playerEl.hidden = !isPlayer;
    tabRow.hidden = isPlayer;
    if (isPlayer) {
      syncPlayer();
      requestAnimationFrame(() => updateCaretPosition());
      return;
    }
    clearArtworkDistortion();
    tabRow.replaceChildren();

    tabs.forEach((tab) => {
      const wrap = document.createElement('div');
      wrap.className = 'mac-dock-tab-wrap';
      if (tab.id === activeTabId) wrap.classList.add('is-active');
      if (tab.copy) wrap.classList.add('mac-dock-tab-wrap--copy');

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
      if (tab.audio) {
        card.dataset.audio = 'true';
        card.setAttribute('aria-pressed', playingTabId === tab.id ? 'true' : 'false');
      }

      const titleRow = document.createElement('div');
      titleRow.className = 'mac-dock-tab__row';

      const icon = document.createElement('span');
      icon.className = 'mac-dock-tab__icon';
      icon.setAttribute('aria-hidden', 'true');
      appendTabIcon(icon, tab);

      const title = document.createElement('span');
      title.className = 'mac-dock-tab__title';
      title.textContent = tab.title;

      titleRow.append(icon, title);
      card.appendChild(titleRow);

      if (tab.subtitle) {
        const hr = document.createElement('span');
        hr.className = 'mac-dock-tab__hr';
        hr.setAttribute('aria-hidden', 'true');

        const subtitleRow = document.createElement('div');
        subtitleRow.className = 'mac-dock-tab__row';

        const subtitle = document.createElement('span');
        subtitle.className = 'mac-dock-tab__subtitle';
        subtitle.textContent = tab.subtitle;
        subtitleRow.appendChild(subtitle);

        card.append(hr, subtitleRow);
      }

      card.addEventListener('click', (e) => {
        if (tab.href === '#' || tab.note || tab.audio) e.preventDefault();
        activeTabId = tab.id;
        if (tab.audio) toggleTrack(tab);
        renderTabPanel();
        if (tab.note) openNote(tab);
      });

      wrap.appendChild(card);

      if (tab.copy) {
        wrap.appendChild(createCopyButton(tab.copyValue || tab.href, tab.title));
      }

      tabRow.appendChild(wrap);
    });

    requestAnimationFrame(() => {
      scrollActiveTabIntoView();
      updateCaretPosition();
    });
  }

  const notePop = document.createElement('div');
  notePop.className = 'aaron-note';
  notePop.id = 'aaron-note';
  notePop.hidden = true;

  const noteBackdrop = document.createElement('button');
  noteBackdrop.type = 'button';
  noteBackdrop.className = 'aaron-note__backdrop';
  noteBackdrop.setAttribute('aria-label', 'Close writing');

  const noteWindow = document.createElement('div');
  noteWindow.className = 'aaron-note__window';
  noteWindow.setAttribute('role', 'dialog');
  noteWindow.setAttribute('aria-modal', 'true');
  noteWindow.setAttribute('aria-labelledby', 'aaron-note-title');

  const noteTitlebar = document.createElement('div');
  noteTitlebar.className = 'aaron-note__titlebar';

  const noteTraffic = document.createElement('div');
  noteTraffic.className = 'aaron-note__traffic';

  const noteClose = document.createElement('button');
  noteClose.type = 'button';
  noteClose.className = 'aaron-note__light aaron-note__light--close';
  noteClose.setAttribute('aria-label', 'Close');
  noteClose.innerHTML = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.2 3.2 8.8 8.8M8.8 3.2 3.2 8.8" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';

  noteTraffic.appendChild(noteClose);

  const noteChromeTitle = document.createElement('p');
  noteChromeTitle.className = 'aaron-note__chrome-title';
  noteChromeTitle.id = 'aaron-note-chrome-title';

  noteTitlebar.append(noteTraffic, noteChromeTitle);

  const noteBody = document.createElement('div');
  noteBody.className = 'aaron-note__body';

  const noteHeading = document.createElement('div');
  noteHeading.className = 'aaron-note__heading';

  const noteTitle = document.createElement('h2');
  noteTitle.className = 'aaron-note__title';
  noteTitle.id = 'aaron-note-title';

  const noteByline = document.createElement('p');
  noteByline.className = 'aaron-note__byline';

  const noteBylineAuthor = document.createElement('span');
  noteBylineAuthor.textContent = 'authored by Aaron Dutta';

  const noteBylineDate = document.createElement('span');

  noteByline.append(noteBylineAuthor, noteBylineDate);
  noteHeading.append(noteTitle, noteByline);

  const noteRule = document.createElement('hr');
  noteRule.className = 'aaron-note__rule';

  const noteCopy = document.createElement('div');
  noteCopy.className = 'aaron-note__copy';

  noteBody.append(noteHeading, noteRule, noteCopy);
  const NOTE_DIRS = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
  NOTE_DIRS.forEach((dir) => {
    const handle = document.createElement('div');
    handle.className = `aaron-note__resize aaron-note__resize--${dir}`;
    handle.dataset.dir = dir;
    handle.setAttribute('aria-hidden', 'true');
    noteWindow.appendChild(handle);
  });

  noteWindow.append(noteTitlebar, noteBody);
  notePop.append(noteBackdrop, noteWindow);
  document.body.appendChild(notePop);

  function isNoteOpen() {
    return !notePop.hidden;
  }

  const NOTE_MIN_W = 420;
  const NOTE_MIN_H = 280;
  const NOTE_MARGIN = 16;
  let noteFrame = null;
  let noteDrag = null;
  let noteResize = null;

  function defaultNoteFrame() {
    const width = Math.min(820, Math.max(160, window.innerWidth - NOTE_MARGIN * 2));
    const height = Math.min(560, Math.max(120, window.innerHeight - NOTE_MARGIN * 2));
    return {
      left: Math.round((window.innerWidth - width) / 2),
      top: Math.round((window.innerHeight - height) / 2),
      width,
      height,
    };
  }

  function applyNoteFrame() {
    if (!noteFrame) return;
    noteWindow.style.left = `${noteFrame.left}px`;
    noteWindow.style.top = `${noteFrame.top}px`;
    noteWindow.style.width = `${noteFrame.width}px`;
    noteWindow.style.height = `${noteFrame.height}px`;
  }

  function clampNoteDrag() {
    const bar = noteTitlebar.getBoundingClientRect();
    const margin = 12;
    if (bar.bottom < margin) noteFrame.top += margin - bar.bottom;
    if (bar.top > window.innerHeight - margin) noteFrame.top += window.innerHeight - margin - bar.top;
    if (bar.right < margin) noteFrame.left += margin - bar.right;
    if (bar.left > window.innerWidth - margin) noteFrame.left += window.innerWidth - margin - bar.left;
    applyNoteFrame();
  }

  function noteResizeCursor(dir) {
    if (dir === 'n' || dir === 's') return 'ns-resize';
    if (dir === 'e' || dir === 'w') return 'ew-resize';
    if (dir === 'ne' || dir === 'sw') return 'nesw-resize';
    return 'nwse-resize';
  }

  function resizeNoteFrame(start, clientX, clientY) {
    const dir = start.dir;
    const dx = clientX - start.x;
    const dy = clientY - start.y;
    let left = start.left;
    let top = start.top;
    let width = start.width;
    let height = start.height;

    if (dir.includes('e')) width = start.width + dx;
    if (dir.includes('s')) height = start.height + dy;
    if (dir.includes('w')) {
      width = start.width - dx;
      left = start.left + dx;
    }
    if (dir.includes('n')) {
      height = start.height - dy;
      top = start.top + dy;
    }

    const minW = Math.min(NOTE_MIN_W, window.innerWidth - NOTE_MARGIN * 2);
    const minH = Math.min(NOTE_MIN_H, window.innerHeight - NOTE_MARGIN * 2);
    if (width < minW) {
      if (dir.includes('w')) left -= minW - width;
      width = minW;
    }
    if (height < minH) {
      if (dir.includes('n')) top -= minH - height;
      height = minH;
    }

    const maxRight = window.innerWidth - NOTE_MARGIN;
    const maxBottom = window.innerHeight - NOTE_MARGIN;
    if (left < NOTE_MARGIN) {
      if (dir.includes('w')) width -= NOTE_MARGIN - left;
      left = NOTE_MARGIN;
    }
    if (top < NOTE_MARGIN) {
      if (dir.includes('n')) height -= NOTE_MARGIN - top;
      top = NOTE_MARGIN;
    }
    if (left + width > maxRight) {
      if (dir.includes('e')) width = maxRight - left;
      else left = Math.max(NOTE_MARGIN, maxRight - width);
    }
    if (top + height > maxBottom) {
      if (dir.includes('s')) height = maxBottom - top;
      else top = Math.max(NOTE_MARGIN, maxBottom - height);
    }

    noteFrame = { left, top, width: Math.max(160, width), height: Math.max(120, height) };
    applyNoteFrame();
  }

  noteTitlebar.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    if (event.target.closest('.aaron-note__light--close')) return;
    if (event.target.closest('.aaron-note__resize')) return;
    if (!noteFrame) return;
    noteDrag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: noteFrame.left,
      top: noteFrame.top,
    };
    noteTitlebar.classList.add('is-dragging');
    try {
      noteTitlebar.setPointerCapture(event.pointerId);
    } catch (err) {}
    event.preventDefault();
  });

  noteWindow.addEventListener('pointerdown', (event) => {
    const handle = event.target.closest('.aaron-note__resize');
    if (!handle || event.button !== 0 || !noteFrame) return;
    const rect = noteWindow.getBoundingClientRect();
    noteResize = {
      id: event.pointerId,
      dir: handle.dataset.dir,
      x: event.clientX,
      y: event.clientY,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
    noteWindow.classList.add('is-resizing');
    document.documentElement.style.cursor = noteResizeCursor(handle.dataset.dir);
    try {
      handle.setPointerCapture(event.pointerId);
    } catch (err) {}
    event.preventDefault();
    event.stopPropagation();
  });

  function moveNotePointer(event) {
    if (noteResize && event.pointerId === noteResize.id) {
      resizeNoteFrame(noteResize, event.clientX, event.clientY);
      return;
    }
    if (!noteDrag || event.pointerId !== noteDrag.id) return;
    noteFrame.left = noteDrag.left + event.clientX - noteDrag.x;
    noteFrame.top = noteDrag.top + event.clientY - noteDrag.y;
    applyNoteFrame();
    clampNoteDrag();
  }

  function endNotePointer(event) {
    if (noteResize && event.pointerId === noteResize.id) {
      noteResize = null;
      noteWindow.classList.remove('is-resizing');
      document.documentElement.style.cursor = '';
    }
    if (!noteDrag || event.pointerId !== noteDrag.id) return;
    noteDrag = null;
    noteTitlebar.classList.remove('is-dragging');
  }

  document.addEventListener('pointermove', moveNotePointer);
  document.addEventListener('pointerup', endNotePointer);
  document.addEventListener('pointercancel', endNotePointer);

  function appendRich(parent, source) {
    const re = /\*\*([\s\S]+?)\*\*|<u>([\s\S]+?)<\/u>/g;
    let last = 0;
    let match;
    const text = source || '';
    while ((match = re.exec(text))) {
      if (match.index > last) {
        parent.appendChild(document.createTextNode(text.slice(last, match.index)));
      }
      const el = document.createElement(match[1] != null ? 'strong' : 'u');
      appendRich(el, match[1] != null ? match[1] : match[2]);
      parent.appendChild(el);
      last = match.index + match[0].length;
    }
    if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
  }

  function resetNoteScroll() {
    noteBody.scrollTop = 0;
  }

  function fillNote(tab) {
    resetNoteScroll();
    noteChromeTitle.textContent = tab.title;
    noteTitle.textContent = tab.title;
    noteBylineDate.textContent = tab.subtitle ? `date: ${tab.subtitle}` : '';
    noteCopy.replaceChildren();
    (tab.note || []).forEach((block) => {
      if (!block || typeof block === 'string') {
        const p = document.createElement('p');
        appendRich(p, block || '');
        noteCopy.appendChild(p);
        return;
      }
      if (block.type === 'lead') {
        const p = document.createElement('p');
        p.className = 'aaron-note__lead';
        appendRich(p, block.text);
        noteCopy.appendChild(p);
        return;
      }
      if (block.type === 'list') {
        const list = document.createElement('ul');
        list.className = 'aaron-note__list';
        (block.items || []).forEach((item) => {
          const li = document.createElement('li');
          appendRich(li, item);
          list.appendChild(li);
        });
        noteCopy.appendChild(list);
      }
    });
    resetNoteScroll();
    requestAnimationFrame(resetNoteScroll);
  }

  function openNote(tab) {
    fillNote(tab);
    if (isNoteOpen()) return;
    noteFrame = defaultNoteFrame();
    applyNoteFrame();
    notePop.hidden = false;
    document.body.classList.add('aaron-note-open');
    noteClose.focus();
  }

  function closeNote(options) {
    if (!isNoteOpen()) return;
    const restoreFocus = !options || options.restoreFocus !== false;
    notePop.hidden = true;
    document.body.classList.remove('aaron-note-open');
    if (restoreFocus && activeAppId === 'notion') {
      tabRow.querySelector('.mac-dock-tab.is-active')?.focus();
    }
  }

  noteClose.addEventListener('click', () => closeNote());
  noteBackdrop.addEventListener('click', () => closeNote());

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isNoteOpen()) return;
    event.preventDefault();
    closeNote();
  });

  function selectApp(appId) {
    if (appId !== 'notion') closeNote({ restoreFocus: false });
    activeAppId = appId;
    const tabs = APP_TABS[appId] || [];
    if (tabs.length && !tabs.some((t) => t.id === activeTabId)) {
      activeTabId = tabs[0].id;
    }
    renderTabPanel();
    updateActiveIconStyles();
  }

  window.AaronDock = { syncMirrorState };

  window.addEventListener('resize', () => {
    updateCaretPosition();
    if (!noteFrame || !isNoteOpen()) return;
    const maxW = window.innerWidth - NOTE_MARGIN * 2;
    const maxH = window.innerHeight - NOTE_MARGIN * 2;
    noteFrame.width = Math.min(noteFrame.width, maxW);
    noteFrame.height = Math.min(noteFrame.height, maxH);
    noteFrame.left = Math.min(Math.max(noteFrame.left, NOTE_MARGIN), window.innerWidth - NOTE_MARGIN - noteFrame.width);
    noteFrame.top = Math.min(Math.max(noteFrame.top, NOTE_MARGIN), window.innerHeight - NOTE_MARGIN - noteFrame.height);
    applyNoteFrame();
  });

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(updateCaretPosition).observe(shell);
  }

  selectApp('dia');
})();
