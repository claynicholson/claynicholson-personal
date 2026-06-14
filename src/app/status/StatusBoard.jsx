"use client";

import { useEffect, useState, useCallback } from "react";

const OVERALL = {
  operational: { label: "All systems operational", cls: "up" },
  degraded: { label: "Degraded performance", cls: "degraded" },
  down: { label: "Partial outage", cls: "down" },
  unknown: { label: "Status unavailable", cls: "unknown" },
};

function fmtPct(p) {
  if (p == null) return "—";
  return `${p >= 99.95 ? "100" : p.toFixed(p >= 99 ? 2 : 1)}%`;
}

function Bars({ bars }) {
  return (
    <div className="status-bars" aria-hidden="true">
      {bars.map((b, i) => (
        <span
          key={i}
          className={`status-bar ${b === 1 ? "up" : b === 0 ? "down" : "nodata"}`}
        />
      ))}
    </div>
  );
}

function dotClass(r) {
  if (!r.up) return "down";
  if (r.degraded) return "degraded";
  return "up";
}

export default function StatusBoard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      const json = await res.json();
      setData(json);
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 30000); // live refresh
    return () => clearInterval(id);
  }, [load]);

  const overall = OVERALL[data?.summary?.overall] || OVERALL.unknown;
  const resources = data?.resources || [];
  const days = data?.window?.days || 30;

  return (
    <div className="status-wrap">
      <header className="status-head">
        <h1 className="status-title">Status</h1>
        <div className={`status-banner ${overall.cls}`}>
          <span className={`status-dot is-${overall.cls}`} />
          <span>{error ? "Status unavailable" : overall.label}</span>
        </div>
      </header>

      {data && !data.configured && (
        <p className="status-empty">Status is temporarily unavailable.</p>
      )}

      {data?.configured && resources.length === 0 && (
        <p className="status-empty">No services are being monitored yet.</p>
      )}

      <ul className="status-list">
        {resources.map((r) => (
          <li key={r.slug} className="status-row">
            <div className="status-row-head">
              <span className={`status-dot is-${dotClass(r)}`} />
              <span className="status-name">
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    {r.name}
                  </a>
                ) : (
                  r.name
                )}
              </span>
              <span className="status-type">{r.type}</span>
              <span className="status-uptime">{fmtPct(r.uptimePct)}</span>
            </div>
            <Bars bars={r.bars} />
            <div className="status-row-foot">
              <span className="status-state">{r.state}</span>
              <span className="status-window">{days}-day uptime</span>
            </div>
          </li>
        ))}
      </ul>

      {data?.generatedAt && (
        <p className="status-foot">
          Updated {new Date(data.generatedAt).toLocaleTimeString()} · refreshes
          every 30s · data from Coolify
        </p>
      )}
    </div>
  );
}
