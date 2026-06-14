// Public status endpoint. Holds the Coolify token server-side, caches results
// so visitors can't hammer Coolify, records an occasional history tick, and
// returns only sanitized fields (no uuids, server IPs, or env), grouped by
// Coolify project.

import { NextResponse } from "next/server";
import { fetchProjectStatus, isConfigured } from "@/lib/coolify";
import {
  maybeRecord,
  summarize,
  summarizeGroup,
  SNAPSHOT_INTERVAL_MS,
} from "@/lib/statusStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = Number(process.env.STATUS_CACHE_TTL_MS || 20 * 1000);
const WINDOW_MS = Number(process.env.STATUS_WINDOW_MS || 30 * 24 * 60 * 60 * 1000);
const BUCKETS = Number(process.env.STATUS_BUCKETS || 90);

let cache = { at: 0, body: null };

// Roll a set of resources up to one status: down > degraded > operational,
// and "unknown" when a project has no resources reporting.
function rollup(resources) {
  if (resources.length === 0) return "unknown";
  if (resources.some((r) => !r.up)) return "down";
  if (resources.some((r) => r.degraded)) return "degraded";
  return "operational";
}

function worst(a, b) {
  const rank = { down: 3, degraded: 2, operational: 1, unknown: 0 };
  return rank[a] >= rank[b] ? a : b;
}

export async function buildStatus(now) {
  const groups = await fetchProjectStatus();

  // Persist a snapshot at most once per interval (self-populating history even
  // without a cron). Flatten every resource across projects for the tick.
  const allResources = groups.flatMap((g) => g.resources);
  const { history } = maybeRecord(allResources, now);
  const opts = { windowMs: WINDOW_MS, buckets: BUCKETS };

  const projects = groups.map((g) => {
    const resources = g.resources.map((r) => {
      const { bars, uptimePct } = summarize(history, r.slug, now, opts);
      return {
        slug: r.slug,
        name: r.name,
        type: r.type,
        url: r.url,
        up: r.up,
        degraded: r.degraded,
        state: r.label,
        uptimePct,
        bars,
      };
    });
    const { bars, uptimePct } = summarizeGroup(
      history,
      g.resources.map((r) => r.slug),
      now,
      opts
    );
    return {
      slug: g.slug,
      name: g.name,
      overall: rollup(g.resources),
      uptimePct,
      bars,
      resources,
    };
  });

  let overall = "operational";
  for (const p of projects) overall = worst(overall, p.overall);
  if (projects.length === 0) overall = "unknown";

  return {
    configured: true,
    generatedAt: now,
    window: { days: Math.round(WINDOW_MS / 86400000), buckets: BUCKETS },
    snapshotIntervalMs: SNAPSHOT_INTERVAL_MS,
    summary: {
      projects: projects.length,
      operational: projects.filter((p) => p.overall === "operational").length,
      degraded: projects.filter((p) => p.overall === "degraded").length,
      down: projects.filter((p) => p.overall === "down").length,
      overall,
    },
    projects,
  };
}

export async function GET() {
  if (!isConfigured()) {
    return NextResponse.json(
      { configured: false, summary: { overall: "unknown", projects: 0 }, projects: [] },
      { status: 200 }
    );
  }

  const now = Date.now();
  if (cache.body && now - cache.at < CACHE_TTL_MS) {
    return NextResponse.json(cache.body);
  }

  try {
    const body = await buildStatus(now);
    cache = { at: now, body };
    return NextResponse.json(body);
  } catch (err) {
    console.error("status: failed to build", err);
    if (cache.body) return NextResponse.json(cache.body); // stale-if-error
    return NextResponse.json(
      { configured: true, error: true, summary: { overall: "unknown", projects: 0 }, projects: [] },
      { status: 200 }
    );
  }
}
