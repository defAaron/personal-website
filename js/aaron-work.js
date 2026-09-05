/**
 * Work page media:
 * - idle thumbnail is an animated GIF
 * - hover swaps in the app preview video
 * - reduced motion keeps the still
 */
(function () {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  function prepVideo(video) {
    if (!video) return;
    video.controls = false;
    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');
    video.removeAttribute('controls');
  }

  function playVideo(video) {
    if (!video) return Promise.resolve();
    prepVideo(video);
    const playPromise = video.play();
    if (!playPromise || typeof playPromise.then !== 'function') return Promise.resolve();
    return playPromise.catch(() => {});
  }

  function pauseVideo(video, reset) {
    if (!video) return;
    video.pause();
    if (reset) {
      try {
        video.currentTime = 0;
      } catch (e) { /* ignore seek before metadata */ }
    }
  }

  function warmVideo(video) {
    if (!video || video.readyState >= 3) return;
    video.preload = 'auto';
    if (video.readyState === 0) {
      try {
        video.load();
      } catch (e) { /* ignore */ }
    }
  }

  document.querySelectorAll('.aaron-projects__media').forEach((media) => {
    const preview = media.querySelector('.aaron-projects__preview');
    if (!preview || !canHover) return;

    prepVideo(preview);

    let hovering = false;
    let playToken = 0;

    const showPreview = () => {
      if (!hovering) return;
      media.classList.add('is-playing');
    };

    const startPreview = () => {
      hovering = true;
      const token = ++playToken;
      if (preview.readyState >= 2) showPreview();
      playVideo(preview).then(() => {
        if (token !== playToken) {
          pauseVideo(preview, true);
          media.classList.remove('is-playing');
          return;
        }
        showPreview();
      });
    };

    const stopPreview = () => {
      hovering = false;
      playToken += 1;
      media.classList.remove('is-playing');
      pauseVideo(preview, true);
    };

    preview.addEventListener('playing', showPreview);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            warmVideo(preview);
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(media);
    } else {
      warmVideo(preview);
    }

    media.addEventListener('pointerenter', startPreview);
    media.addEventListener('pointerleave', stopPreview);
    media.addEventListener('focusin', startPreview);
    media.addEventListener('focusout', (event) => {
      if (!media.contains(event.relatedTarget)) stopPreview();
    });
  });
})();
