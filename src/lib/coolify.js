// Coolify API client. Reads the current status of every resource (apps,
// services, databases) and groups them under their Coolify *project*.
//
//   GET /api/v1/projects                → [{ uuid, name, description }]
//   GET /api/v1/projects/:uuid          → project with nested resources
//   GET /api/v1/servers                 → [{ uuid, name }]
//   GET /api/v1/servers/:uuid/resources → [{ uuid, name, type, status, fqdn }]
//
// Status comes from the servers/resources endpoint (authoritative), and
// project membership from the project detail endpoint. Project→resource
// matching uses tolerant recursive extraction so it doesn't break if Coolify
// tweaks the nested key names. The group list is seeded from /projects so every
// project shows up even when no resource matched.
//
// The API token is read server-side only (never shipped to the browser).

const BASE = (process.env.COOLIFY_API_URL || "").replace(/\/+$/, "");
const TOKEN = process.env.COOLIFY_API_TOKEN || "";

// Optional privacy control: comma-separated project names (substring match) to
// include. If empty, all projects are shown.
const PROJECT_ALLOWLIST = (process.env.STATUS_PROJECT_ALLOWLIST || "")
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
  if (!res.ok) throw new Error(`Coolify ${path} → ${res.status}`);
  return res.json();
}

async function tryApi(path) {
  try {
    return await api(path);
  } catch {
    return null;
  }
}

// "running:healthy" | "running:unhealthy" | "exited:unhealthy" | "degraded" ...
function parseStatus(raw) {
  const s = String(raw || "").toLowerCase();
  const state = s.split(":")[0].split(" ")[0] || "unknown";
  const up = state.startsWith("running");
  // Coolify reports "unhealthy" for any container that simply has no health
  // check configured, so a running container is treated as up. Only a literal
  // "degraded" status (a compose service with some containers actually down)
  // is surfaced as degraded.
  const degraded = up && s.includes("degraded");
  return {
    up,
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

function normalize(raw) {
  const status = parseStatus(raw.status);
  const slug = slugify(raw.name);
  return {
    uuid: raw.uuid || slug, // kept server-side (history/matching), not sent to browser
    slug,
    name: raw.name || slug,
    type: raw.type || raw.resource_type || "resource",
    url: pickUrl(raw),
    ...status,
  };
}

// ── Status (authoritative) ───────────────────────────────────────────────────

async function resourcesViaServers() {
  const servers = await tryApi("/api/v1/servers");
  if (!servers) return [];
  const out = [];
  for (const s of servers) {
    if (!s.uuid) continue;
    const resources = await tryApi(`/api/v1/servers/${s.uuid}/resources`);
    for (const r of resources || []) out.push(normalize(r));
  }
  return out;
}

async function resourcesViaLists() {
  const out = [];
  for (const [path, type] of [
    ["/api/v1/applications", "application"],
    ["/api/v1/services", "service"],
    ["/api/v1/databases", "database"],
  ]) {
    const items = await tryApi(path);
    for (const r of items || []) out.push(normalize({ type, ...r }));
  }
  return out;
}

// ── Project membership ───────────────────────────────────────────────────────

// Recursively collect the uuids of objects that look like resources (have a
// name and at least one resource-ish field), ignoring the project/environment
// wrapper objects. Schema-tolerant: doesn't depend on exact key names.
function collectResourceUuids(node, acc) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) collectResourceUuids(item, acc);
    return;
  }
  const looksLikeResource =
    node.uuid &&
    typeof node.name === "string" &&
    ("status" in node ||
      "fqdn" in node ||
      "last_online_at" in node ||
      "docker_compose" in node ||
      "image" in node);
  if (looksLikeResource) acc.add(node.uuid);
  for (const key of Object.keys(node)) {
    const v = node[key];
    if (v && typeof v === "object") collectResourceUuids(v, acc);
  }
}

function projectAllowed(name) {
  if (PROJECT_ALLOWLIST.length === 0) return true;
  const n = String(name || "").toLowerCase();
  return PROJECT_ALLOWLIST.some((a) => n.includes(a));
}

async function fetchProjectMembership() {
  const projects = await tryApi("/api/v1/projects");
  if (!projects) return { order: [], byUuid: new Map() };

  const order = [];
  const byUuid = new Map(); // resource uuid → project name
  for (const p of projects) {
    if (!p.uuid || !projectAllowed(p.name)) continue;
    order.push(p.name);
    const detail = await tryApi(`/api/v1/projects/${p.uuid}`);
    const uuids = new Set();
    if (detail) collectResourceUuids(detail, uuids);
    for (const u of uuids) byUuid.set(u, p.name);
  }
  return { order, byUuid };
}

// ── Public: resources grouped by project ─────────────────────────────────────

const OTHER = "Other";

export async function fetchProjectStatus() {
  let resources = await resourcesViaServers();
  if (resources.length === 0) resources = await resourcesViaLists();

  // De-dupe resources by uuid.
  const seen = new Map();
  for (const r of resources) if (!seen.has(r.uuid)) seen.set(r.uuid, r);
  resources = [...seen.values()];

  const { order, byUuid } = await fetchProjectMembership();

  // Seed a group for every known project (so all projects show, even empty),
  // preserving Coolify's order.
  const groups = new Map();
  for (const name of order) groups.set(name, []);

  for (const r of resources) {
    const project = byUuid.get(r.uuid) || OTHER;
    if (!groups.has(project)) {
      // Resource's project wasn't in the allowlist/order — only surface it if
      // there's no allowlist (otherwise honour the filter).
      if (PROJECT_ALLOWLIST.length > 0 && project === OTHER) continue;
      groups.set(project, []);
    }
    groups.get(project).push(r);
  }

  // Drop an empty "Other" bucket; keep named projects even if empty.
  if (groups.has(OTHER) && groups.get(OTHER).length === 0) groups.delete(OTHER);

  return [...groups.entries()].map(([name, items]) => ({
    name,
    slug: slugify(name),
    resources: items.sort((a, b) => a.name.localeCompare(b.name)),
  }));
}
