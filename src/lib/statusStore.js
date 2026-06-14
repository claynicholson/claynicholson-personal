// Filesystem-backed status history. Coolify's API only reports *current*
// status, so to draw an uptime graph we persist periodic snapshots ourselves.
//
// Storage is a single JSON file of ticks:
//   { v: 1, ticks: [ { t: <ms>, up: [slug...], down: [slug...] } ] }
//
// It is intentionally dependency-free. In production, point STATUS_DATA_DIR at
// a persistent volume (e.g. a Coolify persistent storage mount) so history
// survives redeploys. If the directory isn't writable, every write becomes a
// no-op and the page falls back to live-only status — it never throws.

import fs from "fs";
import path from "path";

const DATA_DIR =
  process.env.STATUS_DATA_DIR || path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "status-history.json");

// How often a snapshot may be recorded, and how long history is kept.
export const SNAPSHOT_INTERVAL_MS = Number(
  process.env.STATUS_SNAPSHOT_INTERVAL_MS || 5 * 60 * 1000
);
const RETENTION_MS = Number(
  process.env.STATUS_RETENTION_MS || 90 * 24 * 60 * 60 * 1000
);
const MAX_TICKS = Number(process.env.STATUS_MAX_TICKS || 30000);

function emptyHistory() {
  return { v: 1, ticks: [] };
}

export function readHistory() {
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.ticks)) return emptyHistory();
    return data;
  } catch {
    return emptyHistory();
  }
}

function writeHistory(history) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const tmp = `${FILE}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(history));
    fs.renameSync(tmp, FILE); // atomic swap
    return true;
  } catch {
    return false; // read-only FS — degrade to live-only, don't crash
  }
}

function lastTickTime(history) {
  const ticks = history.ticks;
  return ticks.length ? ticks[ticks.length - 1].t : 0;
}

function prune(history, now) {
  const cutoff = now - RETENTION_MS;
  let ticks = history.ticks.filter((t) => t.t >= cutoff);
  if (ticks.length > MAX_TICKS) ticks = ticks.slice(ticks.length - MAX_TICKS);
  history.ticks = ticks;
  return history;
}

// Record a snapshot if enough time has elapsed since the last one.
// `resources` is the normalized list from coolify.fetchResources().
// `now` is injected by the caller (Date.now() isn't available everywhere).
export function maybeRecord(resources, now) {
  const history = readHistory();
  if (now - lastTickTime(history) < SNAPSHOT_INTERVAL_MS) {
    return { recorded: false, history };
  }
  return { recorded: forceRecord(resources, now, history), history };
}

export function forceRecord(resources, now, preloaded) {
  const history = preloaded || readHistory();
  const up = [];
  const down = [];
  for (const r of resources) (r.up ? up : down).push(r.slug);
  history.ticks.push({ t: now, up, down });
  prune(history, now);
  return writeHistory(history);
}

// ── Aggregation for the UI ───────────────────────────────────────────────────

// Build a fixed number of buckets across the window. Each bucket is:
//   1  = up for the whole bucket
//   0  = down at least once in the bucket
//  -1  = no data recorded in the bucket
// plus an overall uptime percentage for the window.
export function summarize(history, slug, now, { windowMs, buckets }) {
  const start = now - windowMs;
  const bucketMs = windowMs / buckets;
  const bars = new Array(buckets).fill(-1);
  let known = 0;
  let upCount = 0;

  for (const tick of history.ticks) {
    if (tick.t < start) continue;
    const inUp = tick.up.includes(slug);
    const inDown = tick.down.includes(slug);
    if (!inUp && !inDown) continue; // resource didn't exist at this tick

    known += 1;
    if (inUp) upCount += 1;

    let idx = Math.floor((tick.t - start) / bucketMs);
    if (idx < 0) idx = 0;
    if (idx >= buckets) idx = buckets - 1;
    if (bars[idx] === -1) bars[idx] = inUp ? 1 : 0;
    else if (!inUp) bars[idx] = 0; // any down in the bucket marks it down
  }

  const uptimePct = known > 0 ? (upCount / known) * 100 : null;
  return { bars, uptimePct, samples: known };
}

// Same as summarize() but for a group of slugs (a project): a bucket/tick is
// "down" if ANY member is down; "up" only if all present members are up.
// Absent members don't force a group down.
export function summarizeGroup(history, slugs, now, { windowMs, buckets }) {
  const start = now - windowMs;
  const bucketMs = windowMs / buckets;
  const set = new Set(slugs);
  const bars = new Array(buckets).fill(-1);
  let known = 0;
  let upCount = 0;

  for (const tick of history.ticks) {
    if (tick.t < start) continue;
    let present = false;
    let anyDown = false;
    for (const s of tick.down) if (set.has(s)) { anyDown = true; present = true; }
    if (!present) for (const s of tick.up) if (set.has(s)) { present = true; break; }
    if (!present) continue;

    known += 1;
    const up = !anyDown;
    if (up) upCount += 1;

    let idx = Math.floor((tick.t - start) / bucketMs);
    if (idx < 0) idx = 0;
    if (idx >= buckets) idx = buckets - 1;
    if (bars[idx] === -1) bars[idx] = up ? 1 : 0;
    else if (!up) bars[idx] = 0;
  }

  const uptimePct = known > 0 ? (upCount / known) * 100 : null;
  return { bars, uptimePct, samples: known };
}
