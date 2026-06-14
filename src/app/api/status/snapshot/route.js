// Secret-guarded endpoint to force a history snapshot. Point a cron at this
// (Coolify scheduled task, GitHub Action, etc.) for reliable, evenly-spaced
// uptime data instead of relying on organic page views:
//
//   curl -fsS -H "x-cron-secret: $STATUS_CRON_SECRET" \
//        https://claynicholson.com/api/status/snapshot
//
// If STATUS_CRON_SECRET is unset, the endpoint is disabled (returns 404) so it
// can't be abused to spam Coolify.

import { NextResponse } from "next/server";
import { fetchProjectStatus, isConfigured } from "@/lib/coolify";
import { forceRecord } from "@/lib/statusStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECRET = process.env.STATUS_CRON_SECRET || "";

async function handle(req) {
  if (!SECRET) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const provided =
    req.headers.get("x-cron-secret") ||
    new URL(req.url).searchParams.get("secret");
  if (provided !== SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isConfigured()) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const now = Date.now();
  const groups = await fetchProjectStatus();
  const resources = groups.flatMap((g) => g.resources);
  const recorded = forceRecord(resources, now);
  return NextResponse.json({ ok: true, recorded, count: resources.length, t: now });
}

export const GET = handle;
export const POST = handle;
