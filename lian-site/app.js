/* 练 — Chinese practice gym.
   Six exercise modes over the HSK 1–6 vocabulary. No framework, no build step. */

'use strict';

const $ = id => document.getElementById(id);
const main = $('main');
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
};
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.random() * a.length | 0];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------------- state ---------------- */
const KEY = 'lian-state-v1';
const state = { level: '1', mode: null, ok: 0, no: 0 };
let store = true;
try { localStorage.setItem('__t', '1'); localStorage.removeItem('__t'); } catch (e) { store = false; }
function save() { if (store) try { localStorage.setItem(KEY, JSON.stringify({ level: state.level, ok: state.ok, no: state.no })); } catch (e) { } }
function load() {
  if (!store) return;
  try { const d = JSON.parse(localStorage.getItem(KEY) || '{}'); if (d.level) state.level = d.level; state.ok = d.ok || 0; state.no = d.no || 0; } catch (e) { }
}

function score(right) {
  right ? state.ok++ : state.no++;
  $('tOk').textContent = state.ok;
  $('tNo').textContent = state.no;
  save();
}
function showTally(on) { $('tally').hidden = !on; $('tOk').textContent = state.ok; $('tNo').textContent = state.no; }


/* ---------------- audio ----------------
   There is no bundled audio: sentences are spoken by the device's own Chinese
   voice through the Web Speech API. Most phones and Macs have one; some Linux
   and Windows installs do not, so every listening exercise checks first. */
const Voice = {
  ready: false, voice: null, rate: 0.9,
  find() {
    if (!('speechSynthesis' in window)) return null;
    const vs = speechSynthesis.getVoices();
    if (!vs.length) return null;
    const zh = vs.filter(v => /^zh/i.test(v.lang) || /chinese|mandarin|普通话|中文/i.test(v.name));
    if (!zh.length) return null;
    // prefer mainland Mandarin over Cantonese or Taiwan when there's a choice
    return zh.find(v => /zh[-_]?CN/i.test(v.lang)) || zh.find(v => !/HK|yue/i.test(v.lang)) || zh[0];
  },
  init(done) {
    const tryFind = () => {
      this.voice = this.find();
      this.ready = !!this.voice;
      if (done) { done(this.ready); done = null; }
    };
    tryFind();
    if (!this.ready && 'speechSynthesis' in window) {
      // Chrome populates the list asynchronously
      speechSynthesis.onvoiceschanged = tryFind;
      setTimeout(tryFind, 600);
    }
  },
  say(text, rate) {
    if (!this.ready) return false;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = this.voice; u.lang = this.voice.lang || 'zh-CN';
    u.rate = rate || this.rate;
    speechSynthesis.speak(u);
    return true;
  },
  stop() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }
};

/* A play bar: big play button, replay-slowly, and the reveal escape hatch. */
function player(text, opts) {
  opts = opts || {};
  const box = el('div', 'player');
  const play = el('button', 'play', '<span class="ico">▶</span><span>Play</span>');
  const slow = el('button', 'slow', 'Slow');
  play.onclick = () => Voice.say(text, Voice.rate);
  slow.onclick = () => Voice.say(text, 0.6);
  box.appendChild(play); box.appendChild(slow);

  if (opts.reveal) {
    const rv = el('button', 'slow', 'Show the characters');
    const hidden = el('div', 'revealed hidden');
    hidden.innerHTML = opts.reveal;
    rv.onclick = () => { hidden.classList.remove('hidden'); rv.remove(); };
    box.appendChild(rv);
    box._reveal = hidden;
  }
  if (opts.auto !== false) setTimeout(() => Voice.say(text, Voice.rate), 220);
  return box;
}

/* Shown in place of an exercise when the device has no Chinese voice. */
function noVoice(sheet, ctrl, fallbackLabel, fallback) {
  sheet.innerHTML = `<p class="task">Listening needs a Chinese voice</p>
    <p class="prompt">Your browser has no Chinese speech voice installed.</p>
    <div class="fb no"><b>How to add one</b>
      <div><b style="display:inline">iPhone / iPad</b> — Settings → Accessibility → Spoken Content → Voices → Chinese.<br>
      <b style="display:inline">Android</b> — Settings → Accessibility → Text-to-speech → install the Chinese language.<br>
      <b style="display:inline">Mac</b> — System Settings → Accessibility → Spoken Content → System Voice → Manage Voices → Chinese.<br>
      <b style="display:inline">Windows</b> — Settings → Time &amp; Language → Language → add Chinese, including speech.<br>
      <b style="display:inline">Desktop Linux</b> — most builds ship no Chinese voice; Chrome on Android or a phone is the easier route.</div>
      <div style="margin-top:10px">Reload this page after installing one.</div></div>`;
  ctrl.innerHTML = '';
  if (fallback) ctrl.appendChild(btn(fallbackLabel, fallback));
  ctrl.appendChild(btn('Back', () => go(null), true));
}

/* ---------------- modes ---------------- */
const MODES = [
  { id: 'build', g: '组', c: 'var(--ice)', name: 'Build the sentence', desc: 'Put scrambled words back into the right order.', n: () => SENTENCES.length },
  { id: 'match', g: '配', c: 'var(--sage)', name: 'Match pairs', desc: 'Pair each character with its meaning before the grid clears.', n: () => PAIRS.length },
  { id: 'grammar', g: '语', c: 'var(--rose)', name: 'Spot the right grammar', desc: 'Two sentences, one mistake. Pick the correct one and see why.', n: () => GRAMMAR.length },
  { id: 'strokes', g: '笔', c: 'var(--ice)', name: 'Write the strokes', desc: 'Trace a character in the right stroke order, on the grid.', n: () => Object.keys(STROKECHARS).length },
  { id: 'read', g: '读', c: 'var(--sage)', name: 'Read a story', desc: 'Short graded texts with tap-to-see glosses and questions.', n: () => STORIES.length },
  { id: 'summary', g: '概', c: 'var(--rose)', name: 'Summarise', desc: 'Read a paragraph and choose the summary that really fits.', n: () => SUMMARIES.length },
  { id: 'dictation', g: '听', c: 'var(--ice)', name: 'Hear it, build it', desc: 'Listen to a sentence and put the words back in order. Characters stay hidden until you answer.', n: () => SENTENCES.length, ear: true },
  { id: 'gist', g: '意', c: 'var(--sage)', name: 'Listen for the gist', desc: 'Hear a short passage, then pick the sentence that sums it up.', n: () => LISTEN.length, ear: true },
  { id: 'reply', g: '答', c: 'var(--rose)', name: 'Answer back', desc: 'Someone speaks to you. Choose the reply that actually fits.', n: () => TALK.length, ear: true }
];

/* ---------------- level picker ---------------- */
function buildLevels() {
  const nav = $('lvl');
  nav.innerHTML = '';
  ['1', '2', '3', '4', '5', '6'].forEach(l => {
    const b = el('button', null, 'HSK ' + l);
    b.dataset.l = l;
    b.setAttribute('aria-pressed', l === state.level);
    b.onclick = () => {
      state.level = l; save();
      [...nav.children].forEach(c => c.setAttribute('aria-pressed', c.dataset.l === l));
      if (state.mode) start(state.mode);
    };
    nav.appendChild(b);
  });
}

/* pool for the current level, widening if a mode has little data at that level */
function atLevel(arr, lvOf) {
  const want = +state.level;
  let out = arr.filter(x => lvOf(x) === want);
  if (out.length >= 4) return out;
  out = arr.filter(x => Math.abs(lvOf(x) - want) <= 1);
  return out.length ? out : arr;
}

/* ---------------- routing ---------------- */
function go(mode) {
  Voice.stop();
  state.mode = mode;
  location.hash = mode ? '#/' + mode : '';
  mode ? start(mode) : home();
}
function start(mode) {
  Voice.stop();
  showTally(true);
  ({ build, match, grammar, strokes, read, summary, dictation, gist, reply })[mode]();
}
$('home').onclick = () => go(null);
addEventListener('hashchange', () => {
  const m = location.hash.replace('#/', '');
  if (MODES.some(x => x.id === m)) { if (state.mode !== m) { state.mode = m; start(m); } }
  else if (state.mode !== null) { state.mode = null; home(); }
});

/* ---------------- home ---------------- */
function home() {
  state.mode = null;
  showTally(false);
  main.className = 'home';
  main.innerHTML = '';
  const lede = el('div', 'lede');
  lede.appendChild(el('h1', null, 'Practise Chinese by doing, not just reading.'));
  lede.appendChild(el('p', null, 'Nine kinds of exercise built on the HSK&nbsp;1–6 vocabulary, plus the full flashcard deck. Pick a level above, then pick something to work on.'));
  main.appendChild(lede);

  const card = m => {
    const b = el('button', 'mode');
    b.style.setProperty('--c', m.c);
    b.innerHTML = `<span class="g">${m.g}</span><span class="body"><h3>${esc(m.name)}</h3><p>${esc(m.desc)}</p><p class="n">${m.n().toLocaleString()} to work through</p></span>`;
    b.onclick = () => go(m.id);
    return b;
  };

  const g1 = el('div', 'modes');
  MODES.filter(m => !m.ear).forEach(m => g1.appendChild(card(m)));
  main.appendChild(g1);

  const h = el('div', 'section-head');
  h.innerHTML = `<h2>Listening</h2><p id="earNote"></p>`;
  main.appendChild(h);

  const g2 = el('div', 'modes');
  MODES.filter(m => m.ear).forEach(m => g2.appendChild(card(m)));
  main.appendChild(g2);

  const note = $('earNote');
  const setNote = ok => {
    if (!note) return;
    note.textContent = ok
      ? 'Spoken by your device\u2019s own Chinese voice. Characters stay hidden until you answer.'
      : 'No Chinese voice found on this device \u2014 open one of these to see how to add one.';
    note.className = ok ? '' : 'warn';
  };
  setNote(Voice.ready);
  if (!Voice.ready) Voice.init(setNote);

  const extra = el('div', 'elsewhere');
  extra.innerHTML = `<a class="mode" href="cards.html" style="--c:var(--sage)">
      <span class="g">卡</span><span class="body"><h3>Flashcards</h3>
      <p>The full HSK 1\u20136 deck \u2014 4,993 words with pinyin, meaning and an example sentence.</p>
      <p class="n">Spaced repetition, separate page</p></span></a>`;
  main.appendChild(extra);
}

/* ---------------- shared exercise shell ---------------- */
function stage() {
  main.className = 'stage';
  main.innerHTML = '';
  const sheet = el('div', 'sheet');
  const ctrl = el('div', 'ctrl');
  main.appendChild(sheet);
  main.appendChild(ctrl);
  return { sheet, ctrl };
}
function btn(label, fn, quiet) {
  const b = el('button', 'btn' + (quiet ? ' quiet' : ''), label);
  b.onclick = fn;
  return b;
}
function feedback(sheet, ok, title, body) {
  const f = el('div', 'fb ' + (ok ? 'ok' : 'no'));
  f.innerHTML = `<b>${esc(title)}</b>${body}`;
  sheet.appendChild(f);
  return f;
}

/* ================================================================
   1. BUILD — drag or tap word tiles into the right order
   ================================================================ */
function build() {
  const pool = atLevel(SENTENCES, x => x.l);
  const item = pick(pool);
  const { sheet, ctrl } = stage();

  sheet.innerHTML = `<p class="task">Put the words in order</p>
    <p class="prompt">${esc(item.st)}</p>`;

  const rail = el('div', 'rail');
  rail.dataset.hint = 'Tap a word below, or drag it up here';
  const tray = el('div', 'tray');
  sheet.appendChild(rail);
  sheet.appendChild(tray);

  let scrambled = shuffle(item.t);
  if (item.t.length > 1 && scrambled.join('') === item.t.join('')) scrambled = shuffle(scrambled);
  scrambled.forEach(w => tray.appendChild(makeTile(w)));

  function makeTile(w) {
    const t = el('button', 'tile zh', esc(w));
    t.dataset.w = w;
    t.onclick = () => {
      if (t.dataset.lock) return;
      (t.parentElement === tray ? rail : tray).appendChild(t);
      refresh();
    };
    dragTile(t, rail, tray, refresh);
    return t;
  }
  function refresh() { check.disabled = rail.children.length !== item.t.length; }

  const check = btn('Check', () => {
    const got = [...rail.children].map(n => n.dataset.w);
    const right = got.join('') === item.t.join('');
    [...rail.children].forEach((n, i) => {
      n.classList.add(n.dataset.w === item.t[i] ? 'ok' : 'no');
      n.classList.add('lock'); n.dataset.lock = '1';
    });
    [...tray.children].forEach(n => { n.classList.add('lock'); n.dataset.lock = '1'; });
    score(right);
    feedback(sheet, right, right ? 'Correct' : 'Not quite — here it is',
      `<div class="zh" style="font-size:21px">${esc(item.s)}</div>
       <div class="py">${esc(item.sp)}</div>`);
    ctrl.innerHTML = '';
    ctrl.appendChild(btn('Next sentence', build));
    ctrl.appendChild(btn('Back', () => go(null), true));
  });
  check.disabled = true;
  ctrl.appendChild(check);
  ctrl.appendChild(btn('Skip', build, true));
}

/* pointer dragging that also works on touch; click still works for tap-to-place */
function dragTile(tile, rail, tray, done) {
  let ghost = null, startX = 0, startY = 0, moved = false;

  tile.addEventListener('pointerdown', e => {
    if (tile.dataset.lock || e.button) return;
    startX = e.clientX; startY = e.clientY; moved = false;
    tile.setPointerCapture(e.pointerId);

    const move = ev => {
      if (!moved && Math.hypot(ev.clientX - startX, ev.clientY - startY) < 6) return;
      if (!moved) {
        moved = true;
        const r = tile.getBoundingClientRect();
        ghost = tile.cloneNode(true);
        ghost.classList.add('ghost');
        ghost.style.width = r.width + 'px'; ghost.style.height = r.height + 'px';
        ghost.dataset.ox = ev.clientX - r.left; ghost.dataset.oy = ev.clientY - r.top;
        document.body.appendChild(ghost);
        tile.classList.add('placeholder');
      }
      ghost.style.left = (ev.clientX - ghost.dataset.ox) + 'px';
      ghost.style.top = (ev.clientY - ghost.dataset.oy) + 'px';
      const over = hit(rail, ev);
      rail.classList.toggle('over', over);
    };

    const up = ev => {
      tile.removeEventListener('pointermove', move);
      tile.removeEventListener('pointerup', up);
      tile.removeEventListener('pointercancel', up);
      rail.classList.remove('over');
      if (!moved) return;                    // a plain tap: the click handler deals with it
      ev.preventDefault();
      ghost.remove(); ghost = null;
      tile.classList.remove('placeholder');
      const target = hit(rail, ev) ? rail : tray;
      const before = target === rail ? insertBefore(rail, ev.clientX, ev.clientY, tile) : null;
      target.insertBefore(tile, before);
      done();
    };

    tile.addEventListener('pointermove', move);
    tile.addEventListener('pointerup', up);
    tile.addEventListener('pointercancel', up);
  });

  // suppress the click that follows a real drag
  tile.addEventListener('click', e => { if (moved) { e.stopImmediatePropagation(); moved = false; } }, true);
}
function hit(box, ev) {
  const r = box.getBoundingClientRect();
  return ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top - 18 && ev.clientY <= r.bottom + 18;
}
function insertBefore(rail, x, y, self) {
  const kids = [...rail.children].filter(n => n !== self);
  for (const n of kids) {
    const r = n.getBoundingClientRect();
    if (y < r.bottom && x < r.left + r.width / 2) return n;
  }
  return null;
}

/* ================================================================
   2. MATCH — character ↔ meaning grid
   ================================================================ */
function match() {
  const pool = atLevel(PAIRS, x => x.l);
  const items = shuffle(pool).slice(0, 6);
  const { sheet, ctrl } = stage();

  sheet.innerHTML = `<p class="task">Match each character with its meaning</p>
    <p class="prompt" style="margin-bottom:18px">Six pairs. Tap one, then its partner.</p>`;
  const grid = el('div', 'grid');
  sheet.appendChild(grid);

  const cells = [];
  items.forEach((it, i) => {
    cells.push({ id: i, kind: 'h', html: `<span><span class="big">${esc(it.h)}</span></span>` });
    cells.push({ id: i, kind: 'm', html: `<span class="sm">${esc(it.m)}</span>` });
  });
  let first = null, left = items.length;

  shuffle(cells).forEach(c => {
    const b = el('button', 'cell', c.html);
    b.dataset.id = c.id;
    b.onclick = () => {
      if (b.classList.contains('gone') || b === first) return;
      if (!first) { first = b; b.classList.add('sel'); return; }
      const hit = first.dataset.id === b.dataset.id;
      if (hit) {
        [first, b].forEach(n => { n.classList.remove('sel'); n.classList.add('ok'); setTimeout(() => n.classList.add('gone'), 260); });
        first = null; left--; score(true);
        if (!left) finish();
      } else {
        const a = first; first = null;
        a.classList.remove('sel');
        [a, b].forEach(n => { n.classList.add('miss'); setTimeout(() => n.classList.remove('miss'), 320); });
        score(false);
      }
    };
    grid.appendChild(b);
  });

  function finish() {
    const list = items.map(it => `<div style="margin-bottom:5px"><span class="zh" style="font-size:19px">${esc(it.h)}</span>
      <span style="opacity:.65"> ${esc(it.p)} — ${esc(it.m)}</span></div>`).join('');
    feedback(sheet, true, 'All six matched', list);
    ctrl.innerHTML = '';
    ctrl.appendChild(btn('Six more', match));
    ctrl.appendChild(btn('Back', () => go(null), true));
  }
  ctrl.appendChild(btn('New set', match, true));
  ctrl.appendChild(btn('Back', () => go(null), true));
}

/* ================================================================
   3. GRAMMAR — which sentence is correct
   ================================================================ */
function grammar() {
  const pool = atLevel(GRAMMAR, x => x.l);
  const item = pick(pool);
  const { sheet, ctrl } = stage();

  sheet.innerHTML = `<p class="task">One of these is wrong. Which is correct?</p>
    <p class="prompt">${esc(item.en)}</p>`;
  const opts = el('div', 'opts');
  sheet.appendChild(opts);

  const order = shuffle(item.o.map((t, i) => ({ t, i })));
  order.forEach((o, n) => {
    const b = el('button', 'opt');
    b.innerHTML = `<span class="k">${'AB CD'[n] || n + 1}</span><span class="body zh">${esc(o.t)}</span>`;
    b.onclick = () => {
      const right = o.i === item.a;
      opts.querySelectorAll('.opt').forEach((x, j) => {
        x.classList.add('done');
        x.onclick = null;
        if (order[j].i === item.a) x.classList.add('ok');
        else if (x === b) x.classList.add('no');
      });
      score(right);
      feedback(sheet, right, right ? 'Correct' : 'The other one', esc(item.why));
      ctrl.innerHTML = '';
      ctrl.appendChild(btn('Next', grammar));
      ctrl.appendChild(btn('Back', () => go(null), true));
    };
    opts.appendChild(b);
  });
  ctrl.appendChild(btn('Skip', grammar, true));
  ctrl.appendChild(btn('Back', () => go(null), true));
}

/* ================================================================
   4. STROKES — trace the character in order
   ================================================================ */
let writer = null;
function strokes() {
  const want = +state.level;
  let chars = Object.keys(STROKECHARS).filter(c => STROKECHARS[c].l === want);
  if (chars.length < 3) chars = Object.keys(STROKECHARS);
  const ch = pick(chars), info = STROKECHARS[ch];
  const { sheet, ctrl } = stage();

  sheet.innerHTML = `<p class="task">Trace the outlined character, stroke by stroke</p>
    <p class="prompt"><span class="zh">${esc(ch)}</span></p>`;

  const wrap = el('div', 'writer');
  const box = el('div');
  box.id = 'target';
  wrap.appendChild(box);
  const info2 = el('div', 'sinfo');
  info2.innerHTML = `<div class="word zh">${esc(info.w)}</div>
    <div class="meta">${esc(info.p)} — ${esc(info.m)}</div>`;
  wrap.appendChild(info2);
  sheet.appendChild(wrap);

  const size = Math.min(300, Math.max(210, window.innerWidth - 110));
  if (writer) { try { writer.cancelQuiz(); } catch (e) { } writer = null; }

  writer = HanziWriter.create(box, ch, {
    width: size, height: size, padding: 8,
    showCharacter: false, showOutline: true,
    strokeColor: '#22223B', outlineColor: '#CFC4BE',
    drawingColor: '#8ABCAD', highlightColor: '#B8F3FF',
    drawingWidth: 26, showHintAfterMisses: 2,
    charDataLoader: (c, onLoad, onErr) => {
      fetch('data/strokes/' + c.codePointAt(0).toString(16) + '.json')
        .then(r => r.json()).then(onLoad).catch(onErr);
    }
  });
  drawGrid(box, size);

  let missed = 0;
  writer.quiz({
    onMistake: () => { missed++; },
    onComplete: () => {
      score(missed === 0);
      feedback(sheet, missed === 0,
        missed === 0 ? 'Clean — right order, first try' : `Done, with ${missed} wrong ${missed === 1 ? 'stroke' : 'strokes'}`,
        `<span class="zh" style="font-size:22px">${esc(ch)}</span> is in <span class="zh">${esc(info.w)}</span> — ${esc(info.p)}, ${esc(info.m)}.`);
      ctrl.innerHTML = '';
      ctrl.appendChild(btn('Next character', strokes));
      ctrl.appendChild(btn('Back', () => go(null), true));
    }
  });

  ctrl.appendChild(btn('Show me', () => { try { writer.cancelQuiz(); } catch (e) { } writer.animateCharacter({ onComplete: () => writer.quiz({ onComplete: () => { ctrl.innerHTML = ''; ctrl.appendChild(btn('Next character', strokes)); ctrl.appendChild(btn('Back', () => go(null), true)); } }) }); }, true));
  ctrl.appendChild(btn('Skip', strokes, true));
  ctrl.appendChild(btn('Back', () => go(null), true));
}
/* the 田字格 guide lines belong here and only here */
function drawGrid(box, size) {
  const svg = box.querySelector('svg');
  if (!svg) return;
  const ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g');
  [[size / 2, 0, size / 2, size], [0, size / 2, size, size / 2]].forEach(([x1, y1, x2, y2]) => {
    const l = document.createElementNS(ns, 'line');
    l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2);
    l.setAttribute('stroke', '#DA9D95'); l.setAttribute('stroke-width', '1.5');
    l.setAttribute('stroke-dasharray', '7 7'); l.setAttribute('opacity', '.55');
    g.appendChild(l);
  });
  svg.insertBefore(g, svg.firstChild);
}

/* ================================================================
   5. READ — graded story, glosses, comprehension
   ================================================================ */
function read() {
  const pool = atLevel(STORIES, x => x.l);
  const st = pick(pool);
  const { sheet, ctrl } = stage();

  const story = el('div', 'story');
  story.innerHTML = `<h2 class="zh">${esc(st.t)}</h2>
    <p class="sub">${esc(st.tp)} · ${esc(st.te)} · HSK ${st.l}</p>`;

  const words = Object.keys(st.g).sort((a, b) => b.length - a.length);
  st.p.forEach(par => {
    let html = esc(par);
    words.forEach((w, i) => { html = html.split(esc(w)).join(`\u0000${i}\u0000`); });
    html = html.replace(/\u0000(\d+)\u0000/g, (m, i) => `<span class="gl" data-w="${esc(words[i])}" tabindex="0" role="button">${esc(words[i])}</span>`);
    story.appendChild(el('p', 'zh', html));
  });

  const gloss = el('div', 'glossbox empty', 'Tap any underlined word to see what it means.');
  story.appendChild(gloss);
  story.querySelectorAll('.gl').forEach(s => {
    const show = () => { gloss.textContent = st.g[s.dataset.w]; gloss.classList.remove('empty'); };
    s.onclick = show;
    s.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); } };
  });
  sheet.appendChild(story);

  const qb = el('div', 'qblock');
  sheet.appendChild(qb);
  let i = 0, right = 0;
  nextQ();

  function nextQ() {
    if (i >= st.q.length) {
      const t = el('div', 'trans');
      t.innerHTML = `<b>Translation</b><br>${esc(st.tr)}`;
      qb.appendChild(t);
      feedback(sheet, right === st.q.length, `${right} of ${st.q.length} right`,
        right === st.q.length ? 'Read it again out loud before you move on.' : 'Re-read the paragraph the missed question came from.');
      ctrl.innerHTML = '';
      ctrl.appendChild(btn('Another story', read));
      ctrl.appendChild(btn('Back', () => go(null), true));
      return;
    }
    const q = st.q[i];
    const block = el('div');
    block.innerHTML = `<p class="q zh">${i + 1}. ${esc(q.q)}</p>`;
    const opts = el('div', 'opts');
    const order = shuffle(q.o.map((t, n) => ({ t, n })));
    order.forEach((o, n) => {
      const b = el('button', 'opt');
      b.innerHTML = `<span class="k">${'ABC'[n]}</span><span class="body zh">${esc(o.t)}</span>`;
      b.onclick = () => {
        const ok = o.n === q.a;
        opts.querySelectorAll('.opt').forEach((x, j) => {
          x.classList.add('done'); x.onclick = null;
          if (order[j].n === q.a) x.classList.add('ok');
          else if (x === b) x.classList.add('no');
        });
        if (ok) right++;
        score(ok);
        i++;
        setTimeout(nextQ, 550);
      };
      opts.appendChild(b);
    });
    block.appendChild(opts);
    qb.appendChild(block);
  }
  ctrl.appendChild(btn('Another story', read, true));
  ctrl.appendChild(btn('Back', () => go(null), true));
}

/* ================================================================
   6. SUMMARY — choose the summary that fits
   ================================================================ */
function summary() {
  const pool = atLevel(SUMMARIES, x => x.l);
  const item = pick(pool);
  const { sheet, ctrl } = stage();

  sheet.innerHTML = `<p class="task">Read it, then choose the best summary</p>
    <p class="prompt">${esc(item.t)}</p>`;
  sheet.appendChild(el('div', 'para zh', esc(item.p)));

  const opts = el('div', 'opts');
  sheet.appendChild(opts);
  const order = shuffle(item.o.map((o, i) => ({ o, i })));
  order.forEach((x, n) => {
    const b = el('button', 'opt');
    b.innerHTML = `<span class="k">${'ABCD'[n]}</span><span class="body zh">${esc(x.o.t)}</span>`;
    b.onclick = () => {
      opts.querySelectorAll('.opt').forEach((y, j) => {
        y.classList.add('done'); y.onclick = null;
        if (order[j].o.ok) y.classList.add('ok');
        else if (y === b) y.classList.add('no');
      });
      score(x.o.ok);
      feedback(sheet, x.o.ok, x.o.ok ? 'That one' : 'Not that one', esc(x.o.why));

      const w = el('div');
      w.innerHTML = `<p class="task" style="margin-top:20px">Now write your own in Chinese, then compare</p>`;
      const ta = el('textarea', 'selfwrite');
      ta.placeholder = '用一两句话概括…';
      w.appendChild(ta);
      const reveal = btn('Compare with a model answer', () => {
        reveal.remove();
        const m = el('div', 'fb ok');
        m.innerHTML = `<b>One way to put it</b><span class="zh" style="font-size:19px">${esc(item.model)}</span>`;
        w.appendChild(m);
      }, true);
      w.appendChild(reveal);
      sheet.appendChild(w);

      ctrl.innerHTML = '';
      ctrl.appendChild(btn('Next paragraph', summary));
      ctrl.appendChild(btn('Back', () => go(null), true));
    };
    opts.appendChild(b);
  });
  ctrl.appendChild(btn('Skip', summary, true));
  ctrl.appendChild(btn('Back', () => go(null), true));
}


/* ================================================================
   7. DICTATION — hear a sentence, rebuild it from word tiles
   ================================================================ */
function dictation() {
  const { sheet, ctrl } = stage();
  if (!Voice.ready) return noVoice(sheet, ctrl, 'Build sentences from English instead', build);

  const pool = atLevel(SENTENCES, x => x.l);
  const item = pick(pool);

  sheet.innerHTML = `<p class="task">Listen, then put the words in order</p>`;
  sheet.appendChild(player(item.s));

  const rail = el('div', 'rail');
  rail.dataset.hint = 'Tap a word below, or drag it up here';
  const tray = el('div', 'tray');
  sheet.appendChild(rail);
  sheet.appendChild(tray);

  let scrambled = shuffle(item.t);
  if (item.t.length > 1 && scrambled.join('') === item.t.join('')) scrambled = shuffle(scrambled);
  scrambled.forEach(w => {
    const t = el('button', 'tile zh', esc(w));
    t.dataset.w = w;
    t.onclick = () => { if (t.dataset.lock) return; (t.parentElement === tray ? rail : tray).appendChild(t); refresh(); };
    dragTile(t, rail, tray, refresh);
    tray.appendChild(t);
  });
  function refresh() { check.disabled = rail.children.length !== item.t.length; }

  const check = btn('Check', () => {
    const got = [...rail.children].map(n => n.dataset.w);
    const right = got.join('') === item.t.join('');
    [...rail.children].forEach((n, i) => {
      n.classList.add(n.dataset.w === item.t[i] ? 'ok' : 'no', 'lock'); n.dataset.lock = '1';
    });
    [...tray.children].forEach(n => { n.classList.add('lock'); n.dataset.lock = '1'; });
    score(right);
    feedback(sheet, right, right ? 'Correct' : 'What was said',
      `<div class="zh" style="font-size:21px">${esc(item.s)}</div>
       <div class="py">${esc(item.sp)}</div>
       <div class="py">${esc(item.st)}</div>`);
    ctrl.innerHTML = '';
    ctrl.appendChild(btn('Next sentence', dictation));
    ctrl.appendChild(btn('Back', () => go(null), true));
  });
  check.disabled = true;
  ctrl.appendChild(check);
  ctrl.appendChild(btn('Skip', dictation, true));
}

/* ================================================================
   8. GIST — hear a passage, choose the summary
   ================================================================ */
function gist() {
  const { sheet, ctrl } = stage();
  if (!Voice.ready) return noVoice(sheet, ctrl, 'Read and summarise instead', summary);

  const pool = atLevel(LISTEN, x => x.l);
  const item = pick(pool);

  sheet.innerHTML = `<p class="task">Listen, then choose what it was about</p>`;
  const pl = player(item.p, { reveal: `<div class="zh">${esc(item.p)}</div>` });
  sheet.appendChild(pl);
  if (pl._reveal) sheet.appendChild(pl._reveal);

  const opts = el('div', 'opts');
  sheet.appendChild(opts);
  const order = shuffle(item.o.map((o, i) => ({ o, i })));
  order.forEach((x, n) => {
    const b = el('button', 'opt');
    b.innerHTML = `<span class="k">${'ABC'[n]}</span><span class="body zh">${esc(x.o.t)}</span>`;
    b.onclick = () => {
      Voice.stop();
      opts.querySelectorAll('.opt').forEach((y, j) => {
        y.classList.add('done'); y.onclick = null;
        if (order[j].o.ok) y.classList.add('ok');
        else if (y === b) y.classList.add('no');
      });
      score(!!x.o.ok);
      feedback(sheet, !!x.o.ok, x.o.ok ? 'Correct' : 'Here it is in full',
        `<div class="zh" style="font-size:19px">${esc(item.p)}</div>
         <div class="py">${esc(item.pp)}</div>
         <div class="py">${esc(item.pe)}</div>`);
      ctrl.innerHTML = '';
      ctrl.appendChild(btn('Next passage', gist));
      ctrl.appendChild(btn('Back', () => go(null), true));
    };
    opts.appendChild(b);
  });
  ctrl.appendChild(btn('Skip', gist, true));
  ctrl.appendChild(btn('Back', () => go(null), true));
}

/* ================================================================
   9. REPLY — hear a line, choose the natural response
   ================================================================ */
function reply() {
  const { sheet, ctrl } = stage();
  if (!Voice.ready) return noVoice(sheet, ctrl, 'Practise grammar instead', grammar);

  const pool = atLevel(TALK, x => x.l);
  const item = pick(pool);

  sheet.innerHTML = `<p class="task">${esc(item.sit)}</p>
    <p class="prompt">What do you say back?</p>`;
  const pl = player(item.a, { reveal: `<div class="zh">${esc(item.a)}</div><div class="py">${esc(item.ap)}</div>` });
  sheet.appendChild(pl);
  if (pl._reveal) sheet.appendChild(pl._reveal);

  const opts = el('div', 'opts');
  sheet.appendChild(opts);
  const order = shuffle(item.o.map((o, i) => ({ o, i })));
  order.forEach((x, n) => {
    const b = el('button', 'opt');
    b.innerHTML = `<span class="k">${'ABC'[n]}</span><span class="body"><span class="zh">${esc(x.o.t)}</span><span class="py">${esc(x.o.p)}</span></span>`;
    b.onclick = () => {
      Voice.stop();
      opts.querySelectorAll('.opt').forEach((y, j) => {
        y.classList.add('done'); y.onclick = null;
        if (order[j].o.ok) y.classList.add('ok');
        else if (y === b) y.classList.add('no');
      });
      score(!!x.o.ok);
      feedback(sheet, !!x.o.ok, x.o.ok ? 'That works' : 'Not that one',
        `${esc(x.o.why)}<div class="py" style="margin-top:9px">They said: <span class="zh">${esc(item.a)}</span> — ${esc(item.ae)}</div>`);
      const again = el('div', 'ctrl', '');
      ctrl.innerHTML = '';
      const hear = btn('Hear the reply', () => Voice.say(item.o.find(o => o.ok).t), true);
      ctrl.appendChild(btn('Next', reply));
      ctrl.appendChild(hear);
      ctrl.appendChild(btn('Back', () => go(null), true));
    };
    opts.appendChild(b);
  });
  ctrl.appendChild(btn('Skip', reply, true));
  ctrl.appendChild(btn('Back', () => go(null), true));
}

addEventListener('pagehide', () => Voice.stop());
document.addEventListener('visibilitychange', () => { if (document.hidden) Voice.stop(); });

/* ---------------- boot ---------------- */
load();
Voice.init();
buildLevels();
const startMode = location.hash.replace('#/', '');
if (MODES.some(m => m.id === startMode)) { state.mode = startMode; start(startMode); } else home();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
}
