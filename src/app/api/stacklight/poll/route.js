// Device-facing half of the relay. The stack light long-polls this endpoint,
// piggybacking its current status on the query string, and gets back a single
// command line as plain text (empty body when the wait times out).
//
//   GET /api/stacklight/poll?token=...&status=pattern%3A%20cylon...
//
// Guarded by STACKLIGHT_DEVICE_TOKEN, separate from the human password so the
// credential baked into firmware can be rotated on its own.

import { takeCommand, recordDevice, waitForCommand, safeEqual } from "@/lib/stacklightStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN = process.env.STACKLIGHT_DEVICE_TOKEN || "";
const WAIT_MS = Number(process.env.STACKLIGHT_POLL_WAIT_MS || 25_000);

function text(body, status = 200) {
  return new Response(body, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

export async function GET(req) {
  if (!TOKEN) return text("not configured", 503);

  const url = new URL(req.url);
  if (!safeEqual(url.searchParams.get("token"), TOKEN)) {
    return text("unauthorized", 401);
  }

  recordDevice(url.searchParams.get("status") || "", Date.now());

  let cmd = takeCommand();
  if (!cmd) {
    await waitForCommand(WAIT_MS);
    cmd = takeCommand();
  }
  return text(cmd || "");
}
