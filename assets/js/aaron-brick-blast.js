/**
 * Brick Blast — breakout played inside the mirrored iPhone screen.
 */
(function () {
  const COLS = 4;
  const ROWS = 5;
  const BALL_R = 6.5;
  const COLORS = ['#fc5c54', '#f5a524', '#34c759', '#5ac8fa', '#bf5af2'];
  const AARON_BEST_MS = 75 * 1000;

  let canvas = null;
  let ctx = null;
  let liveEl = null;
  let raf = 0;
  let ro = null;
  let running = false;
  let laidOut = false;
  let reduced = false;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let paddleT = 0.5;
  let bx = 0;
  let by = 0;
  let vx = 0;
  let vy = 0;
  let speed = 250;
  let hp = [];
  let mode = 'menu';
  let modeUntil = 0;
  let lastTime = 0;
  let lastDt = 0.016;
  let timerMs = 0;
  let timerPlayStart = 0;
  let beatToastTimer = 0;

  function baseSpeed() {
    return reduced ? 140 : 250;
  }

  function rowHits(row) {
    if (row === 0) return 3;
    if (row === 1) return 2;
    return 1;
  }

  function resetTimer() {
    timerMs = 0;
    timerPlayStart = 0;
  }

  function startTimer() {
    if (!timerPlayStart) timerPlayStart = performance.now();
  }

  function pauseTimer() {
    if (!timerPlayStart) return;
    timerMs += performance.now() - timerPlayStart;
    timerPlayStart = 0;
  }

  function elapsedMs() {
    let total = timerMs;
    if (timerPlayStart) total += performance.now() - timerPlayStart;
    return total;
  }

  function beatAaron() {
    return elapsedMs() <= AARON_BEST_MS;
  }

  function clearBeatToastTimer() {
    if (!beatToastTimer) return;
    window.clearTimeout(beatToastTimer);
    beatToastTimer = 0;
  }

  function hideBeatToast() {
    clearBeatToastTimer();
    const toast = document.getElementById('aaron-brick-blast-toast');
    if (!toast) return;
    toast.classList.remove('is-visible');
    window.setTimeout(() => {
      if (!toast.classList.contains('is-visible')) toast.hidden = true;
    }, 500);
  }

  function showBeatToast() {
    const toast = document.getElementById('aaron-brick-blast-toast');
    if (!toast) return;
    toast.hidden = false;
    requestAnimationFrame(() => {
      toast.classList.add('is-visible');
    });
  }

  function formatTimer() {
    const total = elapsedMs();
    const sec = Math.floor(total / 1000);
    const ms = Math.floor(total % 1000);
    return `${sec}.${String(ms).padStart(3, '0')}`;
  }

  function drawTimer(playing) {
    const text = formatTimer();
    const x = 12;
    const y = 6;
    const padX = 7;
    const padY = 4;
    ctx.font = '600 11px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const textW = ctx.measureText(text).width;
    const boxW = textW + padX * 2;
    const boxH = 11 + padY * 2;
    if (playing) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(x - padX, y - padY, boxW, boxH, 5);
      ctx.fill();
      ctx.fillStyle = '#111111';
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
    }
    ctx.fillText(text, x, y);
  }

  function remaining() {
    let count = 0;
    for (let i = 0; i < hp.length; i++) if (hp[i] > 0) count += 1;
    return count;
  }

  function refreshSpeed() {
    const broken = COLS * ROWS - remaining();
    const firstStep = baseSpeed() * 0.16;
    const decay = 0.82;
    const extra = broken === 0
      ? 0
      : firstStep * (1 - Math.pow(decay, broken)) / (1 - decay);
    speed = baseSpeed() + extra;
  }

  function setLive(text) {
    if (!liveEl || liveEl.textContent === text) return;
    liveEl.textContent = text;
  }

  function paddleMetrics() {
    const w = Math.max(56, Math.min(108, width * 0.32));
    const h = 11;
    const travel = Math.max(1, width - w);
    return {
      x: paddleT * (width - w),
      y: height - 22 - h,
      w,
      h,
      travel,
    };
  }

  function brickRect(index) {
    const col = index % COLS;
    const row = Math.floor(index / COLS);
    const padX = 12;
    const padTop = 14;
    const gap = 6;
    const bw = (width - padX * 2 - gap * (COLS - 1)) / COLS;
    const bh = Math.min(22, Math.max(14, height * 0.046));
    return {
      x: padX + col * (bw + gap),
      y: padTop + row * (bh + gap),
      w: bw,
      h: bh,
    };
  }

  function keepSpeed() {
    let mag = Math.hypot(vx, vy);
    if (mag < 1) {
      vx = speed * 0.35;
      vy = -speed * 0.94;
      mag = Math.hypot(vx, vy);
    }
    vx = (vx / mag) * speed;
    vy = (vy / mag) * speed;
    if (Math.abs(vy) < speed * 0.25) {
      vy = (vy < 0 ? -1 : 1) * speed * 0.25;
      const mag2 = Math.hypot(vx, vy);
      vx = (vx / mag2) * speed;
      vy = (vy / mag2) * speed;
    }
  }

  function glueToPaddle() {
    const paddle = paddleMetrics();
    bx = paddle.x + paddle.w / 2;
    by = paddle.y - BALL_R - 2;
  }

  function serve() {
    glueToPaddle();
    const angle = -Math.PI / 2 + (Math.random() * 0.7 - 0.35);
    vx = Math.cos(angle) * speed;
    vy = Math.sin(angle) * speed;
  }

  function resetBoard() {
    hp = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) hp.push(rowHits(row));
    }
    refreshSpeed();
  }

  function enterReady() {
    mode = 'ready';
    vx = 0;
    vy = 0;
    glueToPaddle();
    setLive('Click to launch');
  }

  function beginRound() {
    hideBeatToast();
    resetBoard();
    resetTimer();
    enterReady();
  }

  function restartAfterMiss() {
    resetBoard();
    resetTimer();
    enterReady();
  }

  function pushOut(brick) {
    const left = bx - brick.x;
    const right = brick.x + brick.w - bx;
    const top = by - brick.y;
    const bottom = brick.y + brick.h - by;
    const min = Math.min(left, right, top, bottom);
    if (min === left) bx = brick.x - BALL_R - 0.5;
    else if (min === right) bx = brick.x + brick.w + BALL_R + 0.5;
    else if (min === top) by = brick.y - BALL_R - 0.5;
    else by = brick.y + brick.h + BALL_R + 0.5;
  }

  function collideBricks() {
    for (let i = 0; i < hp.length; i++) {
      if (hp[i] <= 0) continue;
      const brick = brickRect(i);
      const closestX = Math.max(brick.x, Math.min(bx, brick.x + brick.w));
      const closestY = Math.max(brick.y, Math.min(by, brick.y + brick.h));
      const dx = bx - closestX;
      const dy = by - closestY;
      if (dx * dx + dy * dy > BALL_R * BALL_R) continue;

      hp[i] -= 1;
      window.AaronSounds?.playNav();
      if (hp[i] <= 0) refreshSpeed();

      const prevX = bx - vx * lastDt;
      const prevY = by - vy * lastDt;
      const fromLeft = prevX + BALL_R <= brick.x;
      const fromRight = prevX - BALL_R >= brick.x + brick.w;
      const fromTop = prevY + BALL_R <= brick.y;
      const fromBottom = prevY - BALL_R >= brick.y + brick.h;

      if ((fromLeft || fromRight) && !(fromTop || fromBottom)) {
        vx = fromLeft ? -Math.abs(vx) : Math.abs(vx);
      } else if ((fromTop || fromBottom) && !(fromLeft || fromRight)) {
        vy = fromTop ? -Math.abs(vy) : Math.abs(vy);
      } else if (Math.abs(dx) >= Math.abs(dy)) {
        vx = dx >= 0 ? Math.abs(vx) : -Math.abs(vx);
      } else {
        vy = dy >= 0 ? Math.abs(vy) : -Math.abs(vy);
      }

      keepSpeed();
      pushOut(brick);

      if (remaining() === 0) {
        pauseTimer();
        mode = 'win';
        if (beatAaron()) {
          clearBeatToastTimer();
          beatToastTimer = window.setTimeout(() => {
            beatToastTimer = 0;
            showBeatToast();
          }, 320);
          setLive('You win. Aaron sent you a message. Click to play again.');
        } else {
          setLive('You win. Click to play again.');
        }
      }
      return;
    }
  }

  function update(dt) {
    if (!laidOut || width < 2 || height < 2) return;
    lastDt = dt;

    if (mode === 'menu') return;

    if (mode === 'miss') {
      if (performance.now() >= modeUntil) restartAfterMiss();
      return;
    }

    if (mode === 'ready') {
      glueToPaddle();
      return;
    }

    if (mode === 'win') return;

    bx += vx * dt;
    by += vy * dt;

    if (bx < BALL_R) {
      bx = BALL_R;
      vx = Math.abs(vx);
    } else if (bx > width - BALL_R) {
      bx = width - BALL_R;
      vx = -Math.abs(vx);
    }
    if (by < BALL_R) {
      by = BALL_R;
      vy = Math.abs(vy);
    }

    const paddle = paddleMetrics();
    const prevY = by - vy * dt;
    if (
      vy > 0 &&
      prevY + BALL_R <= paddle.y + 1 &&
      by + BALL_R >= paddle.y &&
      bx >= paddle.x - BALL_R &&
      bx <= paddle.x + paddle.w + BALL_R
    ) {
      by = paddle.y - BALL_R;
      const hit = ((bx - paddle.x) / paddle.w) * 2 - 1;
      const theta = Math.max(-1, Math.min(1, hit)) * (Math.PI / 3);
      vx = Math.sin(theta) * speed;
      vy = -Math.cos(theta) * speed;
    }

    collideBricks();

    if (mode === 'play' && by - BALL_R > height) {
      pauseTimer();
      mode = 'miss';
      modeUntil = performance.now() + 700;
      setLive('Try again');
    }
  }

  function roundRect(x, y, w, h, radius) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.fill();
  }

  function draw() {
    if (!ctx || width < 2 || height < 2) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, width, height);

    if (mode === 'menu') return;

    for (let i = 0; i < hp.length; i++) {
      if (hp[i] <= 0) continue;
      const brick = brickRect(i);
      ctx.fillStyle = COLORS[Math.floor(i / COLS) % COLORS.length];
      roundRect(brick.x, brick.y, brick.w, brick.h, 4);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      const labelSize = Math.max(10, Math.min(15, brick.h * 0.62));
      ctx.font = `700 ${labelSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(hp[i]), brick.x + brick.w / 2, brick.y + brick.h / 2);
    }

    const paddle = paddleMetrics();
    ctx.fillStyle = '#f4f4f5';
    roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 6);

    if (mode !== 'miss') {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(bx, by, BALL_R, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (mode === 'win' || mode === 'miss' || mode === 'ready') {
      const won = mode === 'win';
      const panelH = won ? 78 : 48;
      const panelY = height * 0.42;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, panelY, width, panelH);
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 16px Inter, system-ui, sans-serif';
      const label = won ? 'You win' : mode === 'miss' ? 'Try again' : 'Click to launch';
      let lineY = panelY + 24;
      ctx.fillText(label, width / 2, lineY);
      if (won) {
        ctx.font = '500 12px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
        lineY += 20;
        ctx.fillText(formatTimer(), width / 2, lineY);
        lineY += 18;
        ctx.fillText('Click to play again', width / 2, lineY);
      }
      drawTimer(false);
      return;
    }

    drawTimer(mode === 'play');
  }

  function resize() {
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!laidOut) {
      laidOut = true;
      mode = 'menu';
      hp = [];
    } else {
      bx = Math.min(width - BALL_R, Math.max(BALL_R, bx));
      by = Math.min(height - BALL_R, Math.max(BALL_R, by));
    }
    draw();
  }

  function onPointer(event) {
    if (!running || !canvas || width <= 0 || mode === 'menu') return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0) return;
    const local = (event.clientX - rect.left) / rect.width;
    const w = Math.max(56, Math.min(108, width * 0.32));
    const x = Math.min(width - w, Math.max(0, local * width - w / 2));
    paddleT = x / Math.max(1, width - w);
  }

  function play() {
    if (!running || mode !== 'menu') return;
    beginRound();
  }

  function onPointerDown(event) {
    if (!running || event.button > 0 || mode === 'menu') return;
    onPointer(event);
    if (mode === 'win') {
      beginRound();
      return;
    }
    if (mode === 'ready') {
      mode = 'play';
      startTimer();
      serve();
      setLive('Playing');
    }
  }

  function frame(now) {
    if (!running) return;
    if (!lastTime) lastTime = now;
    const dt = Math.min(0.032, (now - lastTime) / 1000);
    lastTime = now;
    update(dt);
    draw();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    hideBeatToast();
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    window.removeEventListener('pointermove', onPointer);
    if (canvas) canvas.removeEventListener('pointerdown', onPointerDown);
    if (ro) ro.disconnect();
    ro = null;
    canvas = null;
    ctx = null;
    laidOut = false;
    lastTime = 0;
  }

  function start(el) {
    stop();
    canvas = el;
    liveEl = document.getElementById('aaron-brick-blast-live');
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    running = true;
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    speed = reduced ? 140 : 250;
    paddleT = 0.5;
    mode = 'menu';
    hp = [];
    window.addEventListener('pointermove', onPointer);
    canvas.addEventListener('pointerdown', onPointerDown);
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    }
    resize();
    raf = requestAnimationFrame(frame);
  }

  window.AaronBrickBlast = { start, stop, play };
})();
