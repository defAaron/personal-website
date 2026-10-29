/**
 * cmd-dock + tilda-bar (inspired by marco.fyi)
 */
(function () {
  const mount = document.getElementById('mac-dock');
  if (!mount) return;

  const APPS = [
    {
      id: 'arc',
      name: 'connect with me',
      icon: '/assets/dock/arc.webp',
      accent: '#fc5c54',
      accentBg: '#ffe8e6',
      tabActiveBg: '#fff0ef',
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
      id: 'notion',
      name: 'writing',
      icon: '/assets/dock/notion.webp',
      accent: '#6366f1',
      accentBg: '#dbddff',
      tabActiveBg: '#eff0ff',
    },
    {
      id: 'cursor',
      name: 'projects',
      icon: '/assets/dock/cursor.png',
      accent: '#6366f1',
      accentBg: '#e8eafc',
      tabActiveBg: '#eff0ff',
    },
    {
      id: 'figma',
      name: 'design',
      icon: '/assets/dock/figma.webp',
      accent: '#a259ff',
      accentBg: '#ede5ff',
      tabActiveBg: '#f5f0ff',
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
    arc: [
      { id: 'arc-1', title: 'Aaron Dutta', subtitle: 'aarondutta.com', emoji: '👤', href: 'https://aarondutta.com', external: true, copy: true },
      { id: 'arc-2', title: 'LinkedIn', subtitle: 'linkedin.com/in/aaron-dutta', icon: '/assets/dock/linkedin.svg', href: 'https://linkedin.com/in/aaron-dutta', external: true, copy: true },
      { id: 'arc-3', title: 'GitHub', subtitle: 'github.com/defAaron', icon: '/assets/dock/github.svg', href: 'https://github.com/defAaron', external: true, copy: true },
      { id: 'arc-4', title: 'X', subtitle: 'x.com/theaar0ndutta', icon: '/assets/dock/x.svg', href: 'https://x.com/theaar0ndutta', external: true, copy: true },
      { id: 'arc-mail', title: 'Email', subtitle: 'aaron.dutta22@uwaterloo.ca', icon: '/assets/dock/email.svg', href: 'mailto:aaron.dutta22@uwaterloo.ca', external: false, copy: true, copyValue: 'aaron.dutta22@uwaterloo.ca' },
      { id: 'arc-6', title: 'Cal.com', subtitle: 'cal.com/aaron-dutta', icon: '/assets/dock/cal.svg', href: 'https://cal.com/aaron-dutta', external: true, copy: true },
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
        id: 'notion-2',
        title: 'navigation',
        subtitle: 'oct 23, 2026',
        icon: '/assets/dock/notion-page.svg',
        href: '#',
        external: false,
        note: [
          "Ever since I could remember, in elementary school and for most of high school, my parents always wanted me to go to the University of Toronto, an Ivy League school, or some kind of top (probably top five) school in the U.S. (whether it's Stanford or something). That mindset has always been there: that I'm capable of being there. The main reason behind this dream of theirs was mainly for the prestige.",
          "Of course I'd be getting an amazing education there because obviously these universities are world-renowned for a reason. It's not just because of a name or because there's a bunch of rich kids over there. It's because they're also getting a high-quality education. It's been proven because the number of successful people that come out of these universities is far greater than at other universities that are not ranked as high.",
          "Definitely it was very understandable that my parents wanted me to go to these universities and their dream also became my dream. I started also dreaming of going to the University of Toronto or maybe somewhere in the States, maybe even somewhere in the UK. That idea kind of fell off after I realized I wanted to stay a little closer to home. I didn't want to go too far because I was just a little bit scared of being on my own that far.",
          "I've always been kind of a home guy. I've never really ventured out on my own because I like being with my family. To make a sudden shift from always being at home, or within the city, or always being with my parents or my friends, to going to a completely different country halfway across the world (where I have no one, almost no one) is a big shift. Who knows how many friends I would have going there? Having not only no support but no way to physically interact with anyone at the start, and also the fact that for emergencies it would be a real problem.",
          "This was one of the main reasons why I was so committed to UofT, ever since maybe grade 4 or grade 5. Before that university would essentially just be a buzzword that I never would think about. Of course at that age I didn't know any kid who was thinking about university that early. When high school hit, specifically grade 10, I think that is when my mind changed.",
          "In grade 7 I wrote a math contest called Gauss by the University of Waterloo and I didn't think too much of it. I thought it was just a random contest. I didn't think it had much prestige and I did decent in it. I didn't do really, really well. I did fairly decent but it turned out to be such a huge contest with so many people.",
          "It turned out that Waterloo just doesn't have the Gauss contest. It has so many other math contests and computer science contests like Beaver and CCC. It even has physics contests like Sir Isaac Newton and chemistry contests, like is Chem 13 News. I ended up writing all of these contests throughout my high school journey.",
          "That's the one thing that introduced me to how great the University of Waterloo is: its commitment to the field of mathematics, computer science, and engineering, and just STEM in general. You could say that those fields are so prominent at the University of Waterloo and they take it really seriously.",
          "Now another reason is their co-op program. When I first heard about this co-op program, this idea was so abstract to my parents and me. For my parents especially, the idea of university is just to study, do exams, do quizzes, and live a very academically focused life. The idea of co-op sounded cool but it was very hard to grasp, understand, and imagine what that would actually play out like and look like in university. I wasn't able to compare a full academic university life to this co-op program that Waterloo has until I actually saw people connected with this co-op program. It wasn't around maybe until late grade 10 or grade 11, especially in grade 12 when I was doing university applications.",
          "So eventually I did commit to the University of Waterloo and it's honestly been such a really good decision. It turned out to be such a good decision that I made. It's because I feel like there's a certain amount of steps you need to take in life that are extremely large. You end up undergoing a paradigm shift where your view of so many things just completely rotates and shifts, mainly due to the people that are surrounding you.",
          "I feel like I just keep ending up being around smarter people with every step. Going from high school, where obviously people were locked in and it was an IB program so there was a fair amount of studying going on, to shifting from just being focused on academics to actually learning, building, creating, and creating it. It's created a culture from a long time ago but I've just recently been introduced to this amazing culture of sharing this knowledge, cherishing it, and continuing to improve this environment.",
          "That's the thing I think that's amazing about Waterloo: everyone is doing something here and they're all sharing. If you're gatekeeping you're not making it. You're not going to make it. GMI.",
          "Obviously a lot of people simultaneously undergo imposter syndrome because everyone is so focused on being so successful at Waterloo. It's okay to feel imposter syndrome. It's normal. I know a lot of people who do and at some point, definitely, I've felt some imposter syndrome too. It's the idea of taking the fear of not being successful (because everyone around you is successful and you feel like you're being left behind) and transforming that fear into inspiration.",
          "When you see all these people doing amazing things, you should say to yourself: I'm in Waterloo. I'm in one of the top schools in Canada, if not the best school, and Waterloo is recognized worldwide now for so many different things. They have an amazing tech culture, an amazing co-op program, and amazing students who are doing so many amazing things. There are so many different projects happening that are genuinely advancing the world, and not just being built for the purpose of being built (see my note on creation in 2026). It might be a robotic arm learning to play the guitar or a humanoid using a toaster. It might be insanely complicated complex research that I don't even understand the title for. These can literally be first years writing these papers with different professors, not just from Waterloo but from around the world. Some of them even submit them contests and whatnot, and they get accepted into these conferences, which is absolutely amazing and so inspiring to see. I'm in Waterloo and if I want to stop this imposter syndrome, I need to embody that standard of a Waterloo student. I can also be great like everyone else. **I can create and accomplish good shit too.**",
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
    figma: [
      { id: 'figma-1', title: 'Personal Website', subtitle: 'figma.com/personal-website', emoji: '✦', href: '#', external: false },
      { id: 'figma-2', title: 'Website Gallery Phone Mockup', subtitle: 'figma.com/website-gallery-phone-mockup', emoji: '✦', href: '#', external: false },
      { id: 'figma-3', title: 'Design Sesh', subtitle: 'figma.com/design-sesh', emoji: '🎨', href: '#', external: false },
      { id: 'figma-4', title: 'Colour Palettes', subtitle: 'figma.com/colour-palettes', emoji: '🎨', href: '#', external: false },
    ],
    cursor: [
      { id: 'cursor-1', title: 'agents.md', subtitle: 'defAaron', emoji: '📁', href: '#', external: false },
      { id: 'cursor-2', title: 'PRD.md', subtitle: 'defAaron', emoji: '📁', href: '#', external: false },
      { id: 'cursor-3', title: 'Indago', subtitle: 'defAaron', emoji: '📁', href: '#', external: false },
      { id: 'cursor-4', title: 'TechniqueTitan', subtitle: 'defAaron', emoji: '📁', href: '#', external: false },
      { id: 'cursor-5', title: 'cs135.rkt', subtitle: 'defAaron', emoji: '📁', href: '#', external: false },
    ],
    spotify: [
      { id: 'spotify-1', title: 'Toronto 2014', subtitle: 'Daniel Caesar', emoji: '1', href: '#', external: false },
      { id: 'spotify-2', title: 'Who Knows', subtitle: 'Daniel Caesar', emoji: '2', href: '#', external: false },
      { id: 'spotify-3', title: 'Piano Concerto No. 2 in C Minor, Op. 18: II. Adagio sostenuto', subtitle: 'Sergei Rachmaninoff', emoji: '3', href: '#', external: false },
    ],
    claude: [
      { id: 'claude-1', title: 'hey claude, print my resume', subtitle: 'click here to view', emoji: '💬', href: '/assets/docs/resume.pdf', external: true },
    ],
  };

  let activeAppId = 'arc';
  let activeTabId = APP_TABS.arc[0].id;

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

  shell.append(tabPanel, dock);
  mount.appendChild(shell);

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
        if (tab.href === '#' || tab.note) e.preventDefault();
        activeTabId = tab.id;
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

  selectApp('arc');
})();
