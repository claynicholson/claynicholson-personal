"use client";

import { useEffect, useRef } from "react";
import { LAMPS, createEngine, step } from "./patterns";

// Geometry, bottom lamp first, matching the physical stack.
const LENS_H = 62;
const LENS_TOP = 230;
const CX = 80;
const LENS_W = 96;
const X0 = CX - LENS_W / 2;

const segments = LAMPS.map((lamp, i) => ({
  ...lamp,
  y: LENS_TOP - i * LENS_H,
  cy: LENS_TOP - i * LENS_H + LENS_H / 2,
}));

/**
 * Renders the tower and animates it from the same pattern math the firmware
 * runs. Levels are written straight to the DOM each frame; putting them through
 * React state would re-render sixty times a second for no benefit.
 */
export default function StackLightTower({ pattern = "off", speed = 1, brightness = 1, live = true }) {
  const lensRefs = useRef([]);
  const glowRefs = useRef([]);
  const engineRef = useRef(createEngine());

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let stopped = false;

    const frame = (now) => {
      if (stopped) return;
      const dt = Math.min((now - last) / 1000, 0.1); // clamp after a tab stall
      last = now;

      const levels = live
        ? step(engineRef.current, pattern, dt, speed)
        : [0, 0, 0, 0];

      for (let i = 0; i < levels.length; i++) {
        const v = levels[i] * brightness;
        const lens = lensRefs.current[i];
        const glow = glowRefs.current[i];
        // A floor of 0.16 keeps each lens legibly its own colour when dark, the
        // way a real tower still reads yellow/white/green/blue switched off.
        if (lens) lens.style.opacity = String(0.16 + v * 0.84);
        if (glow) {
          glow.style.opacity = String(v * 0.85);
          // Bloom outward as it brightens, the way a real diffuser does.
          glow.style.transform = `scale(${0.75 + v * 0.35})`;
        }
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    const onVis = () => { last = performance.now(); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pattern, speed, brightness, live]);

  return (
    <svg
      viewBox="0 0 160 352"
      className="h-full w-full"
      role="img"
      aria-label={`Stack light preview, pattern ${pattern}`}
    >
      <defs>
        <filter id="sl-bloom" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="13" />
        </filter>

        <linearGradient id="sl-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.30 0.010 60)" />
          <stop offset="38%" stopColor="oklch(0.52 0.012 60)" />
          <stop offset="62%" stopColor="oklch(0.40 0.010 60)" />
          <stop offset="100%" stopColor="oklch(0.26 0.008 60)" />
        </linearGradient>

        <linearGradient id="sl-shell" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(1 0 0 / 0.16)" />
          <stop offset="30%" stopColor="oklch(1 0 0 / 0.03)" />
          <stop offset="100%" stopColor="oklch(0 0 0 / 0.30)" />
        </linearGradient>
      </defs>

      {/* Glow sits behind the glass so the lens edges stay crisp on top of it. */}
      {segments.map((s, i) => (
        <ellipse
          key={`glow-${s.key}`}
          ref={(el) => (glowRefs.current[i] = el)}
          cx={CX}
          cy={s.cy}
          rx="74"
          ry="40"
          fill={s.hue}
          filter="url(#sl-bloom)"
          opacity="0"
          style={{ transformOrigin: `${CX}px ${s.cy}px`, transition: "none" }}
        />
      ))}

      {/* Mast */}
      <rect x={CX - 9} y="292" width="18" height="34" fill="url(#sl-metal)" />
      <rect x={CX - 34} y="322" width="68" height="14" rx="3" fill="url(#sl-metal)" />
      <ellipse cx={CX} cy="336" rx="46" ry="6" fill="oklch(0 0 0 / 0.45)" />

      {segments.map((s, i) => (
        <g key={s.key}>
          {/* Unlit glass: enough tint to read as a coloured lens when dark. */}
          <rect x={X0} y={s.y} width={LENS_W} height={LENS_H} rx="7" fill="oklch(0.24 0.012 60)" />
          <rect
            ref={(el) => (lensRefs.current[i] = el)}
            x={X0}
            y={s.y}
            width={LENS_W}
            height={LENS_H}
            rx="7"
            fill={s.hue}
            opacity="0.06"
          />
          {/* Fresnel ridges */}
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={X0 + 3}
              x2={X0 + LENS_W - 3}
              y1={s.y + LENS_H * f}
              y2={s.y + LENS_H * f}
              stroke="oklch(0 0 0 / 0.22)"
              strokeWidth="1.5"
            />
          ))}
          {/* Curvature: highlight left, shadow right */}
          <rect x={X0} y={s.y} width={LENS_W} height={LENS_H} rx="7" fill="url(#sl-shell)" />
          {/* Collar between segments */}
          <rect x={X0 - 5} y={s.y + LENS_H - 5} width={LENS_W + 10} height="9" rx="2.5" fill="url(#sl-metal)" />
        </g>
      ))}

      {/* Cap */}
      <path
        d={`M ${X0 - 5} 44 L ${X0 + LENS_W + 5} 44 L ${X0 + LENS_W - 6} 28 Q ${CX} 20 ${X0 + 6} 28 Z`}
        fill="url(#sl-metal)"
      />
    </svg>
  );
}
