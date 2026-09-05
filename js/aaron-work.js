/**
 * Work page — swap project thumbnails for a looping preview on hover.
 * Videos stay unloaded until hover so the page stays light.
 */
(function () {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canHover || reduceMotion) return;

  document.querySelectorAll('.aaron-projects__media').forEach((media) => {
    const video = media.querySelector('.aaron-projects__preview');
    if (!video) return;

    let playToken = 0;

    const startPreview = () => {
      const token = ++playToken;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            if (token === playToken) media.classList.add('is-playing');
          })
          .catch(() => {});
      }
    };

    const stopPreview = () => {
      playToken += 1;
      media.classList.remove('is-playing');
      video.pause();
      try {
        video.currentTime = 0;
      } catch (e) { /* ignore seek before metadata */ }
    };

    media.addEventListener('mouseenter', startPreview);
    media.addEventListener('mouseleave', stopPreview);
    media.addEventListener('focus', startPreview);
    media.addEventListener('blur', stopPreview);
  });
})();
