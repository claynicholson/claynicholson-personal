// Public status endpoint. Holds the Coolify token server-side, caches results
// so visitors can't hammer Coolify, records an occasional history tick, and
// returns only sanitized fields (no uuids, server IPs, or env).

import { NextResponse } from "next/server";
import { fetchResources, isConfigured } from "@/lib/coolify";
import { maybeRecord, summarize, SNAPSHOT_INTERVAL_MS } from "@/lib/statusStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = Number(process.env.STATUS_CACHE_TTL_MS || 20 * 1000);
const WINDOW_MS = Number(
  process.env.STATUS_WINDOW_MS || 30 * 24 * 60 * 60 * 1000 // 30 days
);
const BUCKETS = Number(process.env.STATUS_BUCKETS || 90);

let cache = { at: 0, body: null };

function overall(resources) {
  if (resources.length === 0) return "unknown";
  if (resources.some((r) => !r.up)) return "down";
  if (resources.some((r) => r.degraded)) return "degraded";
  return "operational";
}

export async function buildStatus(now) {
  const resources = await fetchResources();

  // Persist a snapshot at most once per interval (self-populating history even
  // without a cron — the graph fills in as the page gets viewed).
  const { history } = maybeRecord(resources, now);

  const out = resources.map((r) => {
    const { bars, uptimePct, samples } = summarize(history, r.slug, now, {
      windowMs: WINDOW_MS,
      buckets: BUCKETS,
    });
    return {
      slug: r.slug,
      name: r.name,
      type: r.type,
      url: r.url,
      up: r.up,
      degraded: r.degraded,
      state: r.label,
      uptimePct,
      samples,
      bars,
    };
  });

  return {
    configured: true,
    generatedAt: now,
    window: { days: Math.round(WINDOW_MS / 86400000), buckets: BUCKETS },
    snapshotIntervalMs: SNAPSHOT_INTERVAL_MS,
    summary: {
      total: out.length,
      up: out.filter((r) => r.up && !r.degraded).length,
      degraded: out.filter((r) => r.degraded).length,
      down: out.filter((r) => !r.up).length,
      overall: overall(out),
    },
    resources: out,
  };
}

export async function GET() {
  if (!isConfigured()) {
    return NextResponse.json(
      { configured: false, summary: { overall: "unknown", total: 0 }, resources: [] },
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
    // Never leak internals to a public endpoint.
    console.error("status: failed to build", err);
    if (cache.body) return NextResponse.json(cache.body); // stale-if-error
    return NextResponse.json(
      { configured: true, error: true, summary: { overall: "unknown", total: 0 }, resources: [] },
      { status: 200 }
    );
  }
}
