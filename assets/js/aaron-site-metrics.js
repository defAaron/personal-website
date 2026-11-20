(function () {
  const tile = document.querySelector('.aaron-site-metrics');
  const heart = tile.querySelector('.aaron-site-metrics__heart');
  const face = tile.querySelector('.aaron-site-metrics__face');
  const icon = face.querySelector('svg');
  const sound = tile.querySelector('.aaron-site-metrics__sound');
  const statusText = tile.querySelector('.aaron-site-metrics__status');
  const visits = tile.querySelector('.aaron-site-metrics__visits');
  const visitDigits = tile.querySelector('.aaron-site-metrics__digits');
  const visitLabel = tile.querySelector('.aaron-site-metrics__label');
  const accessibleVisits = tile.querySelector('.aaron-site-metrics__visually-hidden');
  const heartCount = tile.querySelector('.aaron-site-metrics__hearts');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const metricsUrl = tile.dataset.metricsUrl;
  let lastViews = -1;
  let lastHearts = -1;
  let visitWheels = [];
  let shownVisits = 0;
  let visitFrame;
  let visitsVisible = false;

  function positionVisitWheels(count) {
    const width = String(lastViews).length;
    if (visitWheels.length !== width) {
      visitWheels = Array.from({length: width}, () => {
        const wheel = document.createElement("span");
        wheel.className = "aaron-site-metrics__wheel";
        const strip = document.createElement("span");
        strip.className = "aaron-site-metrics__reel";
        strip.textContent = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n0";
        wheel.append(strip);
        return strip;
      });
      visitDigits.replaceChildren(...visitWheels.map(strip => strip.parentElement));
    }

    visitWheels.forEach((strip, index) => {
      const place = 10 ** (width - index - 1);
      const digit = Math.floor(count / place) % 10;
      // A wheel moves only during the single-count interval that carries into its place.
      const carry = Math.max(0, count % place - (place - 1));
      strip.style.transform = `translateY(-${digit + carry}lh)`;
    });
  }

  function rollVisits() {
    if (!visitsVisible || lastViews < 0) return;

    if (reducedMotion.matches || shownVisits >= lastViews) {
      shownVisits = lastViews;
      positionVisitWheels(shownVisits);
      return;
    }

    const start = shownVisits;
    const target = lastViews;
    const finishSteps = Math.min(target - start, 8);
    const fastSteps = target - start - finishSteps;
    const fastDuration = fastSteps * Math.min(20, 2100 / target);
    const finishDuration = finishSteps * 86;
    let startTime;

    function frame(now) {
      startTime ??= now;
      const elapsed = now - startTime;
      if (elapsed >= fastDuration + finishDuration) {
        visitFrame = null;
        shownVisits = target;
        rollVisits();
        return;
      }

      let count;
      if (elapsed < fastDuration) {
        count = start + fastSteps * elapsed / fastDuration;
      } else {
        const progress = (elapsed - fastDuration) / finishDuration;
        count = target - finishSteps * (1 - progress) ** 3;
      }
      positionVisitWheels(count);
      visitFrame = requestAnimationFrame(frame);
    }

    positionVisitWheels(start);
    visitFrame = requestAnimationFrame(frame);
  }

  function renderVisits(value) {
    lastViews = value;
    const label = value === 1 ? "site visit" : "site visits";
    visitLabel.textContent = label;
    accessibleVisits.textContent = value.toLocaleString() + " " + label;
    if (!visitFrame) rollVisits();
  }

  const visitsObserver = new IntersectionObserver(([entry]) => {
    visitsVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
    if (!visitFrame) rollVisits();
  }, { threshold: 0.5 });
  visitsObserver.observe(visits);

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches && visitFrame) {
      cancelAnimationFrame(visitFrame);
      visitFrame = null;
      rollVisits();
    }
  });

  async function sync(counter) {
    let incremented = false;
    try {
      if (!metricsUrl) throw new Error('Metrics project is not configured');
      if (counter) {
        const update = await fetch(`${metricsUrl}/${counter}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ '.sv': { increment: 1 } }),
        });
        if (!update.ok) throw new Error('Counter update failed');
        incremented = true;
        if (counter === 'hearts') statusText.textContent = '';
      }
      const response = await fetch(`${metricsUrl}.json`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Metrics request failed');
      const { views = 0, hearts = 0 } = (await response.json()) ?? {};
      if (views > lastViews) renderVisits(views);
      if (hearts > lastHearts) {
        heartCount.textContent = hearts.toLocaleString() + (hearts === 1 ? ' heart' : ' hearts');
        lastHearts = hearts;
      }
      if (statusText.textContent === 'Metrics unavailable') statusText.textContent = '';
    } catch {
      if (counter === 'hearts' && !incremented) statusText.textContent = 'Heart could not be sent';
      else if (lastViews < 0 && !statusText.textContent) statusText.textContent = 'Metrics unavailable';
    }
  }

  let audio;
  let enabled = true;
  try { enabled = localStorage.getItem("pulse-sound") !== "off"; } catch {}
  sound.setAttribute("aria-pressed", String(enabled));
  function playClick(release) {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!enabled || !Context) return;
    audio ||= new Context();
    audio.resume().catch(() => {});
    const t = audio.currentTime;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(release ? 830 : 290, t);
    oscillator.frequency.exponentialRampToValueAtTime(release ? 390 : 75, t + .04);
    gain.gain.setValueAtTime(.001, t);
    gain.gain.exponentialRampToValueAtTime(release ? .13 : .27, t + .002);
    gain.gain.exponentialRampToValueAtTime(.001, t + .065);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(t);
    oscillator.stop(t + .07);
  }
  sound.onclick = () => {
    enabled = !enabled;
    sound.setAttribute("aria-pressed", String(enabled));
    try { localStorage.setItem("pulse-sound", enabled ? "on" : "off"); } catch {}
    playClick(true);
  };
  function depress() {
    face.getAnimations().forEach(animation => animation.cancel());
    heart.classList.add("is-pressed");
    playClick(false);
  }
  function release() {
    heart.classList.remove("is-pressed");
  }

  function launchMiniHeart() {
    const bounds = tile.getBoundingClientRect();
    const source = icon.querySelector("path").getBoundingClientRect();
    const size = 24;
    const x = source.left + source.width / 2 - bounds.left - size / 2;
    const y = source.top - bounds.top - size / 2;
    const apexHeight = 30 + Math.random() * 34;
    const gravity = 980; // CSS pixels per second squared.
    const lift = Math.sqrt(2 * gravity * apexHeight);
    const drop = bounds.height - y + size;
    const duration = (lift + Math.sqrt(lift * lift + 2 * gravity * drop)) / gravity;
    const drift = (Math.random() * 2 - 1) * (bounds.width / 2 - 22);
    const spin = drift / bounds.width * 160;

    const mini = icon.cloneNode(true);
    mini.classList.add("aaron-site-metrics__mini-heart");
    mini.style.width = size + "px";
    mini.style.left = x + "px";
    mini.style.top = y + "px";
    tile.append(mini);

    const frames = Array.from({length: 31}, (_, i) => {
      const progress = i / 30;
      const time = progress * duration;
      const fall = gravity * time * time / 2 - lift * time;
      return {transform: `translate(${drift * progress}px, ${fall}px) rotate(${spin * progress}deg)`};
    });
    const flight = mini.animate(frames, {duration: duration * 1000, fill: "forwards"});
    flight.onfinish = () => mini.remove();
  }

  heart.onpointerdown = event => { if (event.button === 0) depress(); };
  window.addEventListener("pointerup", release);
  heart.onpointercancel = heart.onblur = release;
  heart.onkeydown = event => {
    if (event.key === " " || event.key === "Enter") {
      if (event.repeat) return event.preventDefault();
      depress();
    }
  };
  heart.onkeyup = release;
  heart.onclick = () => {
    release();
    playClick(true);
    if (!reducedMotion.matches) {
      face.animate([
        {transform: "translateY(2px) scale(.93)"},
        {transform: "translateY(-2px) scale(1.045)", offset: .56},
        {transform: heart.matches(":hover") && matchMedia("(hover: hover)").matches ? "translateY(-2px)" : "none"}
      ], {duration: 240, easing: "ease-out"});
      launchMiniHeart();
    }
    sync('hearts');
  };
  sync('views');
  setInterval(() => {
    if (!document.hidden) sync();
  }, 15000);
})();
