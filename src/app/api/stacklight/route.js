// Web-facing half of the stack light relay: read state, queue a command.
// Guarded by STACKLIGHT_PASSWORD; disabled entirely when that isn't set.

import { NextResponse } from "next/server";
import { pushCommand, snapshot, safeEqual } from "@/lib/stacklightStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PASSWORD = process.env.STACKLIGHT_PASSWORD || "";
const MAX_CMD_LEN = 100;

function guard(req) {
  if (!PASSWORD) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }
  if (!safeEqual(req.headers.get("x-stacklight-password"), PASSWORD)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(req) {
  const denied = guard(req);
  if (denied) return denied;
  return NextResponse.json(snapshot(Date.now()));
}

export async function POST(req) {
  const denied = guard(req);
  if (denied) return denied;

  const body = await req.json().catch(() => ({}));
  const cmd = typeof body.cmd === "string" ? body.cmd.trim() : "";
  if (!cmd || cmd.length > MAX_CMD_LEN || /[\r\n]/.test(cmd)) {
    return NextResponse.json({ error: "bad command" }, { status: 400 });
  }

  pushCommand(cmd);
  return NextResponse.json(snapshot(Date.now()));
}
