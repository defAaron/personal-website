/**
 * iPhone Mirroring window on the home page.
 */
(function () {
  const pop = document.getElementById('aaron-mirror-pop');
  const closeBtn = document.getElementById('aaron-mirror-pop-close');
  const backdrop = document.getElementById('aaron-mirror-pop-backdrop');
  const canvas = document.getElementById('aaron-brick-blast');
  const menu = document.getElementById('aaron-brick-blast-menu');
  const playBtn = document.getElementById('aaron-brick-blast-play');
  const timeEl = document.getElementById('aaron-mirror-time');
  if (!pop || !closeBtn || !backdrop) return;

  function showMenu() {
    if (menu) menu.hidden = false;
  }

  function hideMenu() {
    if (menu) menu.hidden = true;
  }

  let clockTimer = 0;

  const timeFmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  function tickClock() {
    if (!timeEl) return;
    const next = timeFmt.format(new Date()).replace(/\s*[AP]M$/i, '');
    if (timeEl.textContent !== next) timeEl.textContent = next;
  }

  function startClock() {
    tickClock();
    window.clearInterval(clockTimer);
    clockTimer = window.setInterval(tickClock, 1000);
  }

  function stopClock() {
    window.clearInterval(clockTimer);
    clockTimer = 0;
  }

  function isOpen() {
    return !pop.hidden;
  }

  function open() {
    if (isOpen()) return;
    pop.hidden = false;
    document.body.classList.add('aaron-is-mirroring');
    startClock();
    if (canvas && window.AaronBrickBlast) {
      window.AaronBrickBlast.start(canvas);
      showMenu();
    }
    window.AaronDock?.syncMirrorState?.();
    if (menu && !menu.hidden) playBtn?.focus();
    else closeBtn.focus();
  }

  function close() {
    if (!isOpen()) return;
    hideMenu();
    window.AaronBrickBlast?.stop?.();
    stopClock();
    pop.hidden = true;
    document.body.classList.remove('aaron-is-mirroring');
    window.AaronDock?.syncMirrorState?.();
  }

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isOpen()) return;
    event.preventDefault();
    close();
  });

  playBtn?.addEventListener('click', () => {
    hideMenu();
    window.AaronBrickBlast?.play?.();
    canvas?.focus?.();
  });

  window.AaronMirror = { open, close, isOpen };
})();
