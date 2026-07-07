/**
 * Click sounds inspired by marco.fyi — one sound per press.
 */
(function () {
  const SOUNDS = {
    nav: 'assets/sounds/nav-click.mp3',
    app: 'assets/sounds/app-click.mp3',
    tilda: 'assets/sounds/tilda-click.mp3',
    item: 'assets/sounds/item-click.mp3',
  };

  const PRESS_RULES = [
    { selector: '.mac-dock__icon', sound: SOUNDS.app },
    { selector: '.mac-dock-tab', sound: SOUNDS.tilda },
    { selector: '.aaron-nav__item', sound: SOUNDS.nav },
    { selector: '.aaron-nav-info__icon', sound: SOUNDS.nav },
    { selector: '.aaron-nav-info__name', sound: SOUNDS.nav },
    {
      selector: '.aaron-hero__link, .aaron-hero__hl, .aaron-footer a',
      sound: SOUNDS.item,
    },
  ];

  const cache = Object.create(null);

  function getAudio(src) {
    if (!cache[src]) {
      const audio = new Audio(src);
      audio.preload = 'auto';
      cache[src] = audio;
    }
    return cache[src];
  }

  function play(src) {
    const audio = getAudio(src);
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  function findPressRule(target) {
    for (const rule of PRESS_RULES) {
      if (target.closest(rule.selector)) return rule.sound;
    }
    return null;
  }

  document.addEventListener(
    'mousedown',
    (event) => {
      if (event.button !== 0) return;
      const sound = findPressRule(event.target);
      if (sound) play(sound);
    },
    true
  );
})();
