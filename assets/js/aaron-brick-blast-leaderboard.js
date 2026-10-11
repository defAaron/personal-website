/**
 * Global Brick Blast leaderboard (Supabase).
 */
(function () {
  const SUPABASE_URL = 'https://amzjwciijmlvfrehwcry.supabase.co';
  const ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtemp3Y2lpam1sdmZyZWh3Y3J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMjcwMjEsImV4cCI6MjEwMzcwMzAyMX0.Qg-n2yu_7FIiEB5sVS5Tj3RTDhOC-5g0FgXn5F_otvc';
  const TABLE = 'brick_blast_leaderboard';

  function headers() {
    return {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    };
  }

  function formatTimeMs(ms) {
    const total = Math.max(0, Math.floor(ms));
    const sec = Math.floor(total / 1000);
    const frac = Math.floor(total % 1000);
    return `${sec}.${String(frac).padStart(3, '0')}s`;
  }

  function sanitizeName(raw) {
    const trimmed = String(raw || '').trim().slice(0, 24);
    return trimmed;
  }

  async function fetchTop(limit = 5) {
    const params = new URLSearchParams({
      select: 'player_name,time_ms',
      order: 'time_ms.asc',
      limit: String(limit),
    });
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}?${params}`, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
    });
    if (!res.ok) throw new Error('leaderboard_fetch_failed');
    const rows = await res.json();
    return Array.isArray(rows) ? rows : [];
  }

  async function submit(playerName, timeMs) {
    const name = sanitizeName(playerName);
    if (!name) return false;
    const ms = Math.floor(timeMs);
    if (ms <= 0 || ms > 600000) return false;

    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ player_name: name, time_ms: ms }),
    });
    return res.ok;
  }

  function renderList(listEl, rows, { emptyText } = {}) {
    if (!listEl) return;
    listEl.replaceChildren();
    if (!rows.length) {
      const li = document.createElement('li');
      li.className = 'aaron-brick-blast-menu__leaderboard-empty';
      li.textContent = emptyText || 'No scores yet — be the first!';
      listEl.appendChild(li);
      return;
    }
    rows.forEach((row, index) => {
      const li = document.createElement('li');
      li.className = 'aaron-brick-blast-menu__leaderboard-row';
      const rank = document.createElement('span');
      rank.className = 'aaron-brick-blast-menu__leaderboard-rank';
      rank.textContent = String(index + 1);
      const name = document.createElement('span');
      name.className = 'aaron-brick-blast-menu__leaderboard-name';
      name.textContent = row.player_name;
      const time = document.createElement('span');
      time.className = 'aaron-brick-blast-menu__leaderboard-time';
      time.textContent = formatTimeMs(row.time_ms);
      li.append(rank, name, time);
      listEl.appendChild(li);
    });
  }

  async function refresh(listEl) {
    if (!listEl) return;
    listEl.classList.add('is-loading');
    try {
      const rows = await fetchTop(5);
      renderList(listEl, rows);
    } catch {
      renderList(listEl, [], { emptyText: 'Leaderboard unavailable' });
    } finally {
      listEl.classList.remove('is-loading');
    }
  }

  window.AaronBrickBlastLeaderboard = {
    fetchTop,
    submit,
    refresh,
    formatTimeMs,
    sanitizeName,
  };
})();
