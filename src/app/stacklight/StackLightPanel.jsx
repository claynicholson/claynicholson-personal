"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import StackLightTower from "./StackLightTower";
import { PATTERN_NAMES } from "./patterns";

// Warm neutrals tinted toward the site's terracotta rather than neutral grey,
// so the page still reads as part of claynicholson.com despite going dark.
const C = {
  bg: "oklch(0.17 0.008 55)",
  panel: "oklch(0.215 0.010 55)",
  raised: "oklch(0.255 0.011 55)",
  line: "oklch(0.32 0.012 55)",
  text: "oklch(0.96 0.006 55)",
  muted: "oklch(0.68 0.010 55)",
  faint: "oklch(0.54 0.010 55)",
  accent: "oklch(0.66 0.130 45)",
  accentSoft: "oklch(0.66 0.130 45 / 0.14)",
  good: "oklch(0.76 0.150 150)",
  bad: "oklch(0.68 0.160 25)",
};

// Six modes in place of twenty pattern buttons. `preview` is what the tower
// animates while that mode is selected; the show mode instead follows the
// device's reported playlist step, since that advances on its own.
const MODES = [
  { id: "show", label: "Show", note: "Full playlist, looping", cmd: "show on", preview: "cascade" },
  { id: "beacon", label: "Beacon", note: "Steady blink, all four", cmd: "p flash", preview: "flash" },
  { id: "sweep", label: "Sweep", note: "Comet up the tower", cmd: "p cometup", preview: "cometup" },
  { id: "pulse", label: "Pulse", note: "Slow ambient breathing", cmd: "p breathe", preview: "breathe" },
  { id: "alert", label: "Alert", note: "Hard double blink", cmd: "p alarm", preview: "alarm" },
  { id: "off", label: "Off", note: "Everything dark", cmd: "p off", preview: "off" },
];

const KEY = "stacklight-password";

// "pattern: cylon | speed: 1.00 | bright: 100 | ... | show: on (cylon)"
function parseStatus(s) {
  if (!s) return null;
  const grab = (re) => (s.match(re) || [])[1];
  return {
    pattern: grab(/pattern:\s*(\w+)/) || "off",
    speed: Number(grab(/speed:\s*([\d.]+)/) ?? 1),
    bright: Number(grab(/bright:\s*(\d+)/) ?? 100),
    showOn: /show:\s*on/.test(s),
    step: grab(/show:\s*on\s*\(([^)]+)\)/) || null,
  };
}

export default function StackLightPanel() {
  const [password, setPassword] = useState("");
  const [entry, setEntry] = useState("");
  const [state, setState] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(KEY);
      if (saved) setPassword(saved);
    } catch {}
  }, []);

  const call = useCallback(
    async (opts = {}) => {
      const res = await fetch("/api/stacklight", {
        ...opts,
        headers: {
          "x-stacklight-password": password,
          ...(opts.body ? { "content-type": "application/json" } : {}),
        },
        cache: "no-store",
      });
      if (res.status === 401) {
        setPassword("");
        try { sessionStorage.removeItem(KEY); } catch {}
        throw new Error("Session expired");
      }
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      return res.json();
    },
    [password]
  );

  useEffect(() => {
    if (!password) return;
    let alive = true;
    const tick = () =>
      call()
        .then((s) => alive && (setState(s), setError("")))
        .catch((e) => alive && setError(e.message));
    tick();
    const id = setInterval(tick, 3000);
    return () => { alive = false; clearInterval(id); };
  }, [password, call]);

  const send = async (cmd) => {
    setBusy(true);
    try {
      setState(await call({ method: "POST", body: JSON.stringify({ cmd }) }));
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const unlock = async (e) => {
    e.preventDefault();
    const candidate = entry.trim();
    if (!candidate) return;
    setBusy(true);
    try {
      const res = await fetch("/api/stacklight", {
        headers: { "x-stacklight-password": candidate },
        cache: "no-store",
      });
      if (!res.ok) throw new Error(res.status === 401 ? "Not the password" : `Server error ${res.status}`);
      try { sessionStorage.setItem(KEY, candidate); } catch {}
      setPassword(candidate);
      setEntry("");
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const parsed = useMemo(() => parseStatus(state?.status), [state]);

  const deviceMode = useMemo(() => {
    if (!parsed) return null;
    if (parsed.showOn) return "show";
    const hit = MODES.find((m) => m.preview === parsed.pattern);
    return hit ? hit.id : null;
  }, [parsed]);

  // Until the device reports back, and while it is offline entirely, reflect
  // the mode just picked. A tap should move the tower, not wait on a round trip.
  const activeMode = deviceMode ?? chosen;

  // The preview follows the device: its playlist step while the show runs,
  // otherwise whatever pattern it last reported.
  const previewPattern = parsed
    ? parsed.showOn
      ? parsed.step || "cascade"
      : parsed.pattern
    : MODES.find((m) => m.id === chosen)?.preview ?? "off";

  if (!password) {
    return (
      <div style={{ background: C.bg, color: C.text }} className="flex min-h-[80vh] items-center justify-center px-6">
        <form onSubmit={unlock} className="w-full max-w-xs">
          {/* globals.css pins h1 to #111, so colour has to be restated here */}
          <h1 className="mb-1 text-3xl" style={{ fontFamily: "var(--font-serif), Georgia, serif", color: C.text }}>
            Stack light
          </h1>
          <p className="mb-7 text-sm" style={{ color: C.faint }}>Locked</p>
          <input
            type="password"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-lg px-4 py-3 text-base outline-none"
            style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.text }}
            onFocus={(e) => { e.target.style.borderColor = C.accent; }}
            onBlur={(e) => { e.target.style.borderColor = C.line; }}
          />
          <button
            type="submit"
            disabled={busy}
            className="mt-3 w-full rounded-lg px-4 py-3 text-sm font-medium disabled:opacity-40"
            style={{ background: C.accent, color: "oklch(0.16 0.010 55)" }}
          >
            {busy ? "Checking" : "Unlock"}
          </button>
          <p className="mt-4 h-5 text-sm" style={{ color: C.bad }}>{error}</p>
        </form>
      </div>
    );
  }

  const online = state?.online;

  return (
    <div style={{ background: C.bg, color: C.text }} className="min-h-[85vh] px-5 py-8 sm:px-8">
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-14">

        <div className="flex flex-col items-center">
          <div className="h-[290px] w-full max-w-[200px] sm:h-[350px]">
            <StackLightTower
              pattern={previewPattern}
              speed={parsed?.speed ?? 1}
              brightness={(parsed?.bright ?? 100) / 100}
            />
          </div>
          <p className="mt-3 text-center text-xs" style={{ color: C.faint }}>
            Simulated from the reported state
          </p>
        </div>

        <div className="min-w-0">
          <header className="mb-7 flex items-baseline justify-between gap-4">
            <h1
              className="text-3xl sm:text-4xl"
              style={{ fontFamily: "var(--font-serif), Georgia, serif", color: C.text }}
            >
              Stack light
            </h1>
            <span className="flex shrink-0 items-center gap-2 text-sm" style={{ color: online ? C.good : C.faint }}>
              <span
                className="inline-block h-[7px] w-[7px] rounded-full"
                style={{ background: online ? C.good : C.faint, boxShadow: online ? `0 0 8px ${C.good}` : "none" }}
              />
              {online ? "Connected" : "Offline"}
            </span>
          </header>

          <div className="mb-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {MODES.map((m) => {
              const isActive = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => { setChosen(m.id); send(m.cmd); }}
                  disabled={busy}
                  className="rounded-xl px-3 py-3.5 text-left transition-colors duration-200 disabled:opacity-50"
                  style={{
                    background: isActive ? C.accentSoft : C.panel,
                    border: `1px solid ${isActive ? C.accent : C.line}`,
                    color: isActive ? C.accent : C.text,
                  }}
                >
                  <span className="block text-[0.95rem] font-medium leading-tight">{m.label}</span>
                  <span
                    className="mt-0.5 block text-[0.7rem] leading-snug"
                    style={{ color: isActive ? C.accent : C.faint }}
                  >
                    {m.note}
                  </span>
                </button>
              );
            })}
          </div>

          <Slider
            label="Brightness"
            value={parsed?.bright ?? 100}
            min={0}
            max={100}
            format={(v) => `${v}%`}
            onCommit={(v) => send(`bright ${v}`)}
          />
          <Slider
            label="Speed"
            value={Math.round((parsed?.speed ?? 1) * 100)}
            min={25}
            max={300}
            format={(v) => `${(v / 100).toFixed(1)}x`}
            onCommit={(v) => send(`speed ${v / 100}`)}
          />

          <p
            className="mt-6 min-h-[1.25rem] font-mono text-[0.7rem] leading-relaxed"
            style={{ color: error ? C.bad : C.faint }}
          >
            {error || state?.status || "waiting for the light to check in"}
          </p>

          <button
            onClick={() => setAdvanced((v) => !v)}
            className="mt-5 text-xs underline-offset-4 hover:underline"
            style={{ color: C.faint }}
          >
            {advanced ? "Hide" : "All patterns and tuning"}
          </button>

          {advanced && (
            <div className="mt-4 rounded-xl p-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
              <div className="flex flex-wrap gap-1.5">
                {PATTERN_NAMES.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(`p ${p}`)}
                    disabled={busy}
                    className="rounded-md px-2.5 py-1.5 font-mono text-[0.7rem] disabled:opacity-50"
                    style={{
                      background: parsed?.pattern === p ? C.accentSoft : C.raised,
                      color: parsed?.pattern === p ? C.accent : C.muted,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="mt-5">
                <Slider
                  label="Gamma"
                  value={140}
                  min={100}
                  max={300}
                  format={(v) => (v / 100).toFixed(2)}
                  onCommit={(v) => send(`gamma ${v / 100}`)}
                />
                <Slider
                  label="PWM frequency"
                  value={200}
                  min={50}
                  max={5000}
                  step={50}
                  format={(v) => `${v} Hz`}
                  onCommit={(v) => send(`freq ${v}`)}
                />
                <button
                  onClick={() => send("walk")}
                  disabled={busy}
                  className="rounded-lg px-3 py-2 text-xs disabled:opacity-50"
                  style={{ background: C.raised, color: C.muted, border: `1px solid ${C.line}` }}
                >
                  Walk lamps one at a time
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step = 1, format, onCommit }) {
  const [local, setLocal] = useState(value);
  const [dragging, setDragging] = useState(false);

  // Track the device while idle, but never yank the handle out from under a drag.
  useEffect(() => {
    if (!dragging) setLocal(value);
  }, [value, dragging]);

  return (
    <div className="mb-5">
      <label className="mb-2 flex items-baseline justify-between text-sm" style={{ color: C.muted }}>
        <span>{label}</span>
        <span style={{ color: C.text }}>{format(local)}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={local}
        onChange={(e) => setLocal(Number(e.target.value))}
        onPointerDown={() => setDragging(true)}
        onPointerUp={() => { setDragging(false); onCommit(local); }}
        onKeyUp={() => onCommit(local)}
        className="w-full"
        style={{ accentColor: C.accent, height: "28px" }}
      />
    </div>
  );
}
