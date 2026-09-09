/**
 * Work page media:
 * GIF thumbnail by default; hover/touch swaps in a muted looping preview.
 * Video sources are attached only on hover. Playback is never shown until
 * the playing event fires, which avoids Safari's native play overlay.
 */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const probe = document.createElement('video');
  const canWebM = !!(
    probe.canPlayType('video/webm; codecs="vp9"') ||
    probe.canPlayType('video/webm; codecs="vp8"') ||
    probe.canPlayType('video/webm')
  );
  const isSafari = /safari/i.test(navigator.userAgent) &&
    !/chrome|crios|android/i.test(navigator.userAgent);

  function pickSrc(media) {
    const webm = media.getAttribute('data-preview-webm');
    const mp4 = media.getAttribute('data-preview-mp4');
    if (isSafari && canWebM && webm) return webm;
    return mp4 || webm || '';
  }

  function prepVideo(video) {
    video.controls = false;
    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.disablePictureInPicture = true;
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('disablepictureinpicture', '');
    video.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback noplaybackrate');
    video.removeAttribute('controls');
    if (video.controlsList) {
      video.controlsList.add('nodownload');
      video.controlsList.add('nofullscreen');
      video.controlsList.add('noremoteplayback');
    }
  }

  function createVideo() {
    const video = document.createElement('video');
    video.className = 'aaron-projects__preview';
    video.setAttribute('aria-hidden', 'true');
    video.tabIndex = -1;
    prepVideo(video);
    return video;
  }

  function unloadVideo(video) {
    video.pause();
    try {
      video.currentTime = 0;
    } catch (e) { /* ignore seek before metadata */ }
    video.removeAttribute('src');
    video.removeAttribute('autoplay');
    while (video.firstChild) video.removeChild(video.firstChild);
    try {
      video.load();
    } catch (e) { /* ignore */ }
  }

  document.querySelectorAll('.aaron-projects__media[data-preview-mp4], .aaron-projects__media[data-preview-webm]').forEach((media) => {
    const src = pickSrc(media);
    if (!src) return;

    let video = null;
    let generation = 0;
    let hovering = false;
    let leaveTimer = 0;
    let attachedSrc = '';

    const reveal = () => {
      if (!hovering || !video || video.paused) return;
      media.classList.add('is-playing');
    };

    const ensureVideo = () => {
      if (video && video.isConnected) return video;
      video = createVideo();
      const link = media.querySelector('.aaron-projects__media-link');
      media.insertBefore(video, link || null);
      video.addEventListener('playing', reveal);
      video.addEventListener('pause', () => {
        if (!hovering) media.classList.remove('is-playing');
      });
      return video;
    };

    const startPreview = () => {
      hovering = true;
      window.clearTimeout(leaveTimer);
      const token = ++generation;
      const el = ensureVideo();
      prepVideo(el);

      if (attachedSrc !== src) {
        el.src = src;
        attachedSrc = src;
        el.load();
      }

      const playAttempt = el.play();
      if (playAttempt && typeof playAttempt.then === 'function') {
        playAttempt.then(() => {
          if (token !== generation || !hovering) return;
          reveal();
        }).catch(() => {
          /* play() interrupted by a later pause/unload */
        });
      }
    };

    const stopPreview = () => {
      hovering = false;
      generation += 1;
      media.classList.remove('is-playing');
      if (!video) return;
      unloadVideo(video);
      attachedSrc = '';
    };

    const scheduleStop = () => {
      window.clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(stopPreview, 80);
    };

    media.addEventListener('mouseenter', startPreview);
    media.addEventListener('mouseleave', scheduleStop);
    media.addEventListener('touchstart', startPreview, { passive: true });
    media.addEventListener('focusin', startPreview);
    media.addEventListener('focusout', (event) => {
      if (!media.contains(event.relatedTarget)) scheduleStop();
    });

    document.addEventListener('touchstart', (event) => {
      if (!media.contains(event.target)) scheduleStop();
    }, { passive: true });
  });
})();
