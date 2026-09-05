/**
 * Work page media:
 * - idle thumbnail is an animated GIF
 * - hover fades in the full app preview video via CSS; JS starts playback
 * - reduced motion keeps the still
 */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  function prepVideo(video) {
    if (!video) return;
    video.controls = false;
    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
    video.loop = true;
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
    if (!preview) return;

    prepVideo(preview);
    warmVideo(preview);

    const startPreview = () => {
      media.classList.add('is-playing');
      playVideo(preview);
    };

    const stopPreview = () => {
      media.classList.remove('is-playing');
      pauseVideo(preview, true);
    };

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
    }

    media.addEventListener('pointerenter', startPreview);
    media.addEventListener('pointerleave', stopPreview);
    media.addEventListener('mouseenter', startPreview);
    media.addEventListener('mouseleave', stopPreview);
    media.addEventListener('focusin', startPreview);
    media.addEventListener('focusout', (event) => {
      if (!media.contains(event.relatedTarget)) stopPreview();
    });
  });
})();
