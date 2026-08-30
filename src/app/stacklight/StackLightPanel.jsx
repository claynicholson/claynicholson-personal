"use client";

import { useCallback, useEffect, useState } from "react";

// Kept in step with PATTERNS[] in the firmware. Sending an unknown name is
// harmless — the device replies "err: unknown pattern" — so a drift here
// degrades to a dud button rather than anything worse.
const PATTERNS = [
  "flash", "cometup", "cometdown", "chase", "cylon", "breathe", "wave",
  "cascade", "ripple", "heartbeat", "sparkle", "flicker", "vu", "theater",
  "strobe", "alarm", "lava", "bounce", "solid", "off",
];

const KEY = "stacklight-password";

export default function StackLightPanel() {
  const [password, setPassword] = useState("");
  const [entry, setEntry] = useState("");
  const [state, setState] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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
        throw new Error("Wrong password");
      }
      if (!res.ok) throw new Error(`Server error (${res.status})`);
      return res.json();
    },
    [password]
  );

  // Poll for liveness while unlocked.
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
      if (!res.ok) throw new Error(res.status === 401 ? "Wrong password" : `Server error (${res.status})`);
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

  if (!password) {
    return (
      <form onSubmit={unlock} className="space-y-4">
        <h1 className="text-2xl font-semibold">Stack Light</h1>
        <input
          type="password"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium disabled:opacity-50"
        >
          {busy ? "Checking…" : "Unlock"}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    );
  }

  const online = state?.online;

  return (
    <div className="space-y-7">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Stack Light</h1>
        <span className={`flex items-center gap-2 text-sm ${online ? "text-green-400" : "text-neutral-500"}`}>
          <span className={`h-2 w-2 rounded-full ${online ? "bg-green-400" : "bg-neutral-600"}`} />
          {online ? "online" : "offline"}
        </span>
      </header>

      <p className="min-h-[2.5rem] rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-400">
        {error ? error : state?.status || "waiting for the light to check in…"}
      </p>

      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Patterns</h2>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {PATTERNS.map((p) => (
            <button
              key={p}
              onClick={() => send(`p ${p}`)}
              disabled={busy}
              className="rounded-lg border border-neutral-700 bg-neutral-800 px-2 py-3 text-sm active:bg-blue-600 disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Adjust</h2>
        <Slider label="Brightness" min={0} max={100} initial={100} fmt={(v) => v} onCommit={(v) => send(`bright ${v}`)} />
        <Slider label="Speed" min={10} max={400} initial={100} fmt={(v) => `${(v / 100).toFixed(1)}×`} onCommit={(v) => send(`speed ${v / 100}`)} />
        <Slider label="Gamma" min={100} max={300} initial={140} fmt={(v) => (v / 100).toFixed(2)} onCommit={(v) => send(`gamma ${v / 100}`)} />
      </section>

      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Modes</h2>
        <div className="grid grid-cols-2 gap-2">
          {[["Show on", "show on"], ["Show off", "show off"], ["Walk", "walk"], ["All off", "p off"]].map(
            ([label, cmd]) => (
              <button
                key={cmd}
                onClick={() => send(cmd)}
                disabled={busy}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-3 text-sm active:bg-blue-600 disabled:opacity-50"
              >
                {label}
              </button>
            )
          )}
        </div>
      </section>
    </div>
  );
}

function Slider({ label, min, max, initial, fmt, onCommit }) {
  const [value, setValue] = useState(initial);
  return (
    <div>
      <label className="mb-1 flex justify-between text-sm text-neutral-400">
        <span>{label}</span>
        <b className="text-neutral-100">{fmt(value)}</b>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        onPointerUp={() => onCommit(value)}
        onKeyUp={() => onCommit(value)}
        className="w-full accent-blue-500"
      />
    </div>
  );
}
