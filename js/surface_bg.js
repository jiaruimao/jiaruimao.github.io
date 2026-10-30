// Background: 4 x 3 white cortical surfaces, each spinning 360 degrees about the vertical axis.
  (function () {
    const d = window.SURFACE_ASCII;
    if (!d) return;
    const layer = document.getElementById('bg-layer');
    const COLS = 4, ROWS = 3;
    let minC = Infinity, maxC = -1, minR = Infinity, maxR = -1;
    d.frames.forEach(f => f.split('\n').forEach((line, r) => {
      const t = line.trimEnd(); if (!t) return;
      minC = Math.min(minC, t.length - t.trimStart().length); maxC = Math.max(maxC, t.length - 1);
      minR = Math.min(minR, r); maxR = Math.max(maxR, r);
    }));
    const bw = maxC - minC + 1, bh = maxR - minR + 1;
    const tiles = [];
    for (let i = 0; i < COLS * ROWS; i++) {
      const el = document.createElement('pre'); layer.appendChild(el);
      tiles.push({ el, col: i % COLS, row: Math.floor(i / COLS) });
    }
    function layout() {
      const cw = innerWidth / COLS, ch = innerHeight / ROWS;
      const fs = Math.min((cw * 0.9) / (bw * 0.6), (ch * 0.9) / bh);
      tiles.forEach(t => {
        t.el.style.fontSize = fs.toFixed(2) + 'px';
        t.el.style.left = (cw * (t.col + 0.5) - ((minC + maxC + 1) / 2) * fs * 0.6).toFixed(1) + 'px';
        t.el.style.top  = (ch * (t.row + 0.5) - ((minR + maxR + 1) / 2) * fs).toFixed(1) + 'px';
      });
    }
    let k = 0;
    function draw() { tiles.forEach(t => { t.el.textContent = d.frames[k]; }); }
    layout(); draw();
    addEventListener('resize', layout);
    setInterval(() => { k = (k + 1) % d.frames.length; draw(); }, 90);
  })();
