// Coolify API client. Reads the current status of every resource (apps,
// services, databases) across all servers in the team the token belongs to.
//
// Coolify has no single "all resources" endpoint, so we iterate
//   GET /api/v1/servers           → [{ uuid, name, ... }]
//   GET /api/v1/servers/:uuid/resources → [{ uuid, name, type, status, ... }]
// and fall back to the per-type list endpoints if that shape isn't available.
//
// The API token is read server-side only (never shipped to the browser).

const BASE = (process.env.COOLIFY_API_URL || "").replace(/\/+$/, "");
const TOKEN = process.env.COOLIFY_API_TOKEN || "";

// Optional privacy controls (a public page shouldn't necessarily expose every
// internal service name). STATUS_ALLOWLIST = comma-separated names/uuids to
// include; if empty, everything is shown.
const ALLOWLIST = (process.env.STATUS_ALLOWLIST || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export function isConfigured() {
  return Boolean(BASE && TOKEN);
}

async function api(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Coolify ${path} → ${res.status}`);
  }
  return res.json();
}

// "running:healthy" | "running:unhealthy" | "exited:unhealthy" | "degraded" ...
function parseStatus(raw) {
  const s = String(raw || "").toLowerCase();
  const state = s.split(":")[0].split(" ")[0] || "unknown";
  const up = state === "running" || state === "running(healthy)";
  const unhealthy = s.includes("unhealthy");
  const healthy = s.includes("healthy") && !unhealthy;
  const degraded = s.includes("degraded") || (up && unhealthy);
  return {
    up,
    healthy,
    degraded,
    label: up ? (degraded ? "degraded" : "running") : state || "stopped",
  };
}

function pickUrl(r) {
  const raw = r.fqdn || r.domains || r.fqdns || "";
  const first = String(raw).split(",")[0].trim();
  if (!first) return null;
  return first.startsWith("http") ? first : `https://${first}`;
}

function slugify(name) {
  return String(name || "resource")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function allowed(r) {
  if (ALLOWLIST.length === 0) return true;
  const name = String(r.name || "").toLowerCase();
  const uuid = String(r.uuid || "").toLowerCase();
  return ALLOWLIST.some((a) => name.includes(a) || uuid === a);
}

function normalize(raw, serverName) {
  const status = parseStatus(raw.status);
  const slug = slugify(raw.name);
  return {
    // `uuid` is kept server-side (history key) but not sent to the browser.
    uuid: raw.uuid || slug,
    slug,
    name: raw.name || slug,
    type: raw.type || raw.resource_type || "resource",
    server: serverName || raw.server?.name || null,
    url: pickUrl(raw),
    ...status,
  };
}

async function viaServers() {
  const servers = await api("/api/v1/servers");
  const out = [];
  for (const s of servers || []) {
    if (!s.uuid) continue;
    let resources = [];
    try {
      resources = await api(`/api/v1/servers/${s.uuid}/resources`);
    } catch {
      continue;
    }
    for (const r of resources || []) {
      if (allowed(r)) out.push(normalize(r, s.name));
    }
  }
  return out;
}

async function viaLists() {
  const out = [];
  for (const [path, type] of [
    ["/api/v1/applications", "application"],
    ["/api/v1/services", "service"],
    ["/api/v1/databases", "database"],
  ]) {
    try {
      const items = await api(path);
      for (const r of items || []) {
        if (allowed(r)) out.push(normalize({ type, ...r }, null));
      }
    } catch {
      // endpoint unavailable on this version — skip
    }
  }
  return out;
}

// Returns a de-duplicated, sorted list of normalized resources.
export async function fetchResources() {
  let resources = [];
  try {
    resources = await viaServers();
  } catch {
    resources = [];
  }
  if (resources.length === 0) {
    resources = await viaLists();
  }

  // De-dupe by uuid (a resource can appear under multiple lookups).
  const seen = new Map();
  for (const r of resources) {
    if (!seen.has(r.uuid)) seen.set(r.uuid, r);
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
}
