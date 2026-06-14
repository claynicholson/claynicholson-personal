"use client";

import { useEffect, useState } from "react";

// Pinging status light for the site header. Polls the public status summary
// and colors itself green (operational) / amber (degraded) / red (outage).
// Clicking it goes to the /status page, which links out to each service.
export default function StatusLight() {
  const [overall, setOverall] = useState("operational");

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        const json = await res.json();
        if (alive && json?.summary?.overall) setOverall(json.summary.overall);
      } catch {
        /* keep last known */
      }
    };
    load();
    const id = setInterval(load, 60000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const cls =
    overall === "down" ? "is-down" : overall === "degraded" ? "is-degraded" : "is-up";

  return (
    <a className="status-light" href="/status" title="Service status">
      <span className={`status-dot ${cls}`} />
      <span className="status-light-label">status</span>
    </a>
  );
}
