// Ports of the firmware's pattern functions (src/main.cpp) so the on-screen
// tower shows what the real lamp is doing rather than a decorative guess.
//
// Every pattern is a pure function of phase (0..1) returning four levels in
// stack order: index 0 is the bottom lamp. Keep the math here identical to the
// firmware; if one drifts, the preview quietly starts lying.

export const N = 4;

// Bottom-to-top, matching ORDER[] on the device.
export const LAMPS = [
  { key: "yellow", label: "Yellow", hue: "oklch(0.86 0.175 92)" },
  { key: "white", label: "White", hue: "oklch(0.97 0.012 92)" },
  { key: "green", label: "Green", hue: "oklch(0.80 0.190 148)" },
  { key: "blue", label: "Blue", hue: "oklch(0.72 0.170 252)" },
];

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const wrap01 = (p) => {
  const m = p % 1;
  return m < 0 ? m + 1 : m;
};
const tri = (p) => {
  const w = wrap01(p);
  return w < 0.5 ? w * 2 : 2 - w * 2;
};
const sine01 = (p) => 0.5 * (1 - Math.cos(wrap01(p) * Math.PI * 2));
const fill = (v) => [v, v, v, v];

// Distance from `pos` back to lamp `i`, wrapping, so a comet trails behind its
// head instead of glowing symmetrically around it.
const tailDist = (pos, i) => {
  let d = pos - i;
  while (d < 0) d += N;
  while (d >= N) d -= N;
  return d;
};

const fns = {
  flash: (p) => fill(wrap01(p) < 0.5 ? 1 : 0),

  solid: () => fill(1),
  off: () => fill(0),

  cometup: (p) => {
    const pos = p * N;
    return [0, 1, 2, 3].map((i) => Math.exp(-tailDist(pos, i) * 1.9));
  },

  cometdown: (p) => {
    const pos = (1 - p) * N;
    return [0, 1, 2, 3].map((i) => {
      let d = i - pos;
      while (d < 0) d += N;
      while (d >= N) d -= N;
      return Math.exp(-d * 1.9);
    });
  },

  chase: (p) => {
    const idx = Math.floor(wrap01(p) * N) % N;
    return [0, 1, 2, 3].map((i) => (i === idx ? 1 : 0));
  },

  cylon: (p) => {
    const pos = tri(p) * (N - 1);
    return [0, 1, 2, 3].map((i) => clamp01(1 - Math.abs(pos - i) / 1.35));
  },

  breathe: (p) => fill(0.02 + 0.98 * Math.pow(sine01(p), 1.5)),

  wave: (p) => [0, 1, 2, 3].map((i) => sine01(p - i * 0.18)),

  cascade: (p) => {
    const x = wrap01(p) * 2;
    const lvl = x < 1 ? x * N : (2 - x) * N;
    return [0, 1, 2, 3].map((i) => clamp01(lvl - i));
  },

  ripple: (p) => {
    const w = wrap01(p);
    const r = w * (N * 0.75);
    const fade = 1 - w;
    return [0, 1, 2, 3].map((i) => clamp01(1 - Math.abs(Math.abs(i - 1.5) - r) / 0.9) * fade);
  },

  heartbeat: (p) => {
    const w = wrap01(p);
    const a = Math.exp(-w * 16);
    const b = w >= 0.2 ? Math.exp(-(w - 0.2) * 16) * 0.7 : 0;
    return fill(Math.max(a, b));
  },

  vu: (p) => {
    const lvl = Math.pow(sine01(p), 1.8) * N;
    return [0, 1, 2, 3].map((i) => clamp01(lvl - i));
  },

  theater: (p) => {
    const step = Math.floor(wrap01(p) * 8) & 1;
    return [0, 1, 2, 3].map((i) => ((i + step) & 1 ? 1 : 0));
  },

  strobe: (p) => fill(wrap01(p * 6) < 0.12 ? 1 : 0),

  alarm: (p) => {
    const w = wrap01(p);
    return fill(w < 0.08 || (w > 0.16 && w < 0.24) ? 1 : 0);
  },

  // Four incommensurate sines, so it never visibly repeats.
  lava: (p) => {
    const f = [1.0, 1.37, 0.81, 1.73];
    const s = [0.0, 0.62, 1.91, 3.4];
    return [0, 1, 2, 3].map((i) => 0.5 + 0.5 * Math.sin(p * Math.PI * 2 * f[i] + s[i]));
  },

  bounce: (p) => {
    const w = wrap01(p);
    const h = Math.abs(Math.sin(w * Math.PI * 3)) * (1 - w * 0.75);
    const pos = h * (N - 1);
    return [0, 1, 2, 3].map((i) => clamp01(1 - Math.abs(pos - i) / 1.1));
  },
};

// Stateful ones need the frame delta, so they're kept apart from the pure set.
const stateful = {
  sparkle: (st, dt) => {
    st.lvl ??= [0, 0, 0, 0];
    st.next ??= 0;
    st.next -= dt;
    if (st.next <= 0) {
      st.lvl[Math.floor(Math.random() * N)] = 1;
      st.next = 0.04 + Math.random() * 0.1;
    }
    const decay = Math.exp(-dt * 5);
    st.lvl = st.lvl.map((v) => v * decay);
    return [...st.lvl];
  },
  flicker: (st, dt) => {
    st.cur ??= [0, 0, 0, 0];
    st.tgt ??= [0, 0, 0, 0];
    for (let i = 0; i < N; i++) {
      if (Math.abs(st.cur[i] - st.tgt[i]) < 0.02) st.tgt[i] = 0.35 + Math.random() * 0.65;
      st.cur[i] += (st.tgt[i] - st.cur[i]) * clamp01(dt * 9);
    }
    return [...st.cur];
  },
};

// Period in ms, matching the PATTERNS[] table on the device.
export const PERIODS = {
  flash: 700, cometup: 1200, cometdown: 1200, chase: 800, cylon: 1400,
  breathe: 3000, wave: 1800, cascade: 2000, ripple: 1100, heartbeat: 1200,
  sparkle: 1000, flicker: 1000, vu: 1600, theater: 900, strobe: 1200,
  alarm: 1000, lava: 6000, bounce: 1600, solid: 1000, off: 1000,
};

export const PATTERN_NAMES = Object.keys(PERIODS);

export function createEngine() {
  return { phase: 0, name: "flash", st: {} };
}

// Advances the engine and returns four 0..1 levels, bottom lamp first.
export function step(engine, name, dtSec, speed = 1) {
  if (name !== engine.name) {
    engine.name = name;
    engine.phase = 0;
    engine.st = {};
  }
  const period = PERIODS[name] ?? 1000;
  engine.phase = wrap01(engine.phase + (dtSec * 1000 * speed) / period);

  if (stateful[name]) return stateful[name](engine.st, dtSec);
  const fn = fns[name] ?? fns.off;
  return fn(engine.phase).map(clamp01);
}
