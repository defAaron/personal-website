(() => {
  const tile = document.querySelector('.aaron-smart-paste');
  if (!tile) return;

  const command = tile.querySelector('[data-key="command"]');
  const paste = tile.querySelector('[data-key="paste"]');
  const entries = tile.querySelector('.aaron-smart-paste__entries');
  const status = tile.querySelector('.aaron-smart-paste__status');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let resetTimer;
  const history = [
    ['2110561682246324708', 'my friend’s group chat just got roasted…', 'Oct 15'],
    ['2115957672121909488', 'if ur still reading books without visualization...', 'Oct 30'],
    ['2118934492228596162', 'just turned my car into a Tesla Roadster...', 'Nov 7'],
    ['2123144547761029559', 'No one tells you how to actually make this yourself...', 'Nov 18'],
  ];

  const rows = history.map(([id, text, date], index) => {
    const row = document.createElement('li');
    row.className = 'aaron-smart-paste__entry';
    row.inert = true;
    row.style.setProperty('--row-index', history.length - 1 - index);
    row.style.zIndex = history.length - index;

    const link = document.createElement('a');
    link.className = 'aaron-smart-paste__entry-link';
    link.href = 'https://x.com/theaar0ndutta/status/' + id;
    link.tabIndex = -1;

    const icon = document.createElement('span');
    icon.className = 'aaron-smart-paste__entry-icon';
    const image = document.createElement('img');
    image.src = 'assets/icons/smart-paste/link-icon.svg';
    image.alt = '';
    icon.append(image);

    const label = document.createElement('span');
    label.className = 'aaron-smart-paste__entry-text';
    label.textContent = text;

    const timestamp = document.createElement('span');
    timestamp.className = 'aaron-smart-paste__entry-time';
    timestamp.textContent = date;

    link.append(icon, label, timestamp);
    row.append(link);
    return row;
  });
  // Playback uses the original row order. The scrollable list starts with the newest post.
  entries.append(...rows.slice().reverse());

  const slots = [
    [278, 1, 1],
    [226, .9, 1],
    [180, .8, .2],
    [141, .6, .1],
  ];

  function positionRow(row, [y, scale, opacity]) {
    row.style.setProperty('--row-y', y);
    row.style.setProperty('--row-scale', scale);
    row.style.setProperty('--row-opacity', opacity);
    row.inert = opacity === 0;
  }

  function selectEntry(selected) {
    if (selected > 0) window.AaronSounds?.playSmartPasteWhoosh();
    rows.forEach((row, index) => {
      const offset = index - selected;
      const slot = slots[offset] || (offset < 0 ? [364, 1, 0] : [95, .4, 0]);
      positionRow(row, slot);
      row.classList.toggle('is-selected', offset === 0);
    });
    status.textContent = 'Smart Paste selected ' + history[selected][1];
  }

  function showPosts() {
    tile.dataset.stage = 'result';
    command.removeAttribute('aria-disabled');
    command.setAttribute('aria-pressed', 'false');
    rows.forEach(row => {
      row.inert = false;
      row.classList.remove('is-selected');
      row.firstElementChild.removeAttribute('tabindex');
    });
    status.textContent = 'Four posts are ready to open.';
    resetTimer = setTimeout(reset, 7000);
  }

  function settlePosts() {
    tile.dataset.stage = 'settling';
    command.setAttribute('aria-pressed', 'false');
    rows.forEach(row => row.classList.remove('is-selected'));
    setTimeout(showPosts, 480);
  }

  function reset() {
    clearTimeout(resetTimer);
    if (entries.contains(document.activeElement)) command.focus({ preventScroll: true });
    entries.scrollTop = 0;
    delete tile.dataset.stage;
    rows.forEach(row => {
      positionRow(row, [245, 1, 0]);
      row.firstElementChild.tabIndex = -1;
    });
    status.textContent = '';
  }

  function pressCommand() {
    if (tile.dataset.stage && tile.dataset.stage !== 'result') return;
    if (tile.dataset.stage === 'result') reset();
    tile.dataset.stage = 'command';
    command.setAttribute('aria-pressed', 'true');
    paste.removeAttribute('aria-disabled');
    window.AaronSounds?.playSmartPasteKey('command');
    status.textContent = 'Command pressed. Select the Magic Hour key to show the posts.';
  }

  function playHistory() {
    if (tile.dataset.stage !== 'command') return;

    command.setAttribute('aria-disabled', 'true');
    paste.setAttribute('aria-disabled', 'true');
    window.AaronSounds?.playSmartPasteKey('paste');

    if (reducedMotion.matches) {
      showPosts();
      return;
    }

    window.AaronSounds?.prepareSmartPasteWhoosh();
    const introStart = 180;
    const historyStart = introStart + 1472;
    tile.dataset.stage = 'playing';
    rows.forEach((row, index) => {
      const [y, scale] = slots[index];
      positionRow(row, [y - 10, scale, 0]);
      const revealOrder = rows.length - 1 - index;
      setTimeout(() => {
        if (revealOrder === 0) window.AaronSounds?.playSmartPasteWhoosh();
        positionRow(row, slots[index]);
      }, historyStart + 190 + revealOrder * 90);
    });

    setTimeout(() => {
      tile.dataset.stage = 'intro';
      window.AaronSounds?.playSmartPasteWhoosh();
    }, introStart);
    setTimeout(() => { tile.dataset.stage = 'history'; }, historyStart);
    setTimeout(() => selectEntry(0), historyStart + 900);
    setTimeout(() => selectEntry(1), historyStart + 1350);
    setTimeout(() => selectEntry(2), historyStart + 2450);
    setTimeout(() => selectEntry(3), historyStart + 3550);

    setTimeout(settlePosts, historyStart + 4050);
  }

  command.addEventListener('click', pressCommand);
  paste.addEventListener('click', playHistory);
  tile.addEventListener('keydown', event => {
    if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'v' || event.repeat) return;
    event.preventDefault();
    pressCommand();
    playHistory();
  });
})();
