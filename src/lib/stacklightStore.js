// In-memory relay between the /stacklight page and the physical stack light.
//
// Unlike statusStore this deliberately persists nothing: a queued "p cylon" is
// meaningless after a redeploy, and last-known status is re-reported by the
// device within a couple of seconds of it reconnecting.
//
// The device holds a long poll open, so a tap on the page reaches the lamp in
// roughly one network round trip rather than waiting out a polling interval.
//
// NOTE: this assumes a single app instance. If the site is ever scaled to
// multiple replicas, a command posted to one replica won't reach a device
// long-polling another, and this needs to move to Redis or similar.

import crypto from "crypto";

const QUEUE_MAX = 20;
const OFFLINE_AFTER_MS = 20_000;

const state = {
  queue: [],
  status: "",
  lastSeen: 0,
  waiters: [],
};

export function safeEqual(a, b) {
  const ab = Buffer.from(String(a ?? ""));
  const bb = Buffer.from(String(b ?? ""));
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function pushCommand(cmd) {
  state.queue.push(cmd);
  while (state.queue.length > QUEUE_MAX) state.queue.shift();
  const wake = state.waiters.shift();
  if (wake) wake();
  return state.queue.length;
}

export function takeCommand() {
  return state.queue.shift() ?? null;
}

export function recordDevice(status, now) {
  if (status) state.status = status;
  state.lastSeen = now;
}

export function snapshot(now) {
  return {
    online: state.lastSeen > 0 && now - state.lastSeen < OFFLINE_AFTER_MS,
    lastSeen: state.lastSeen || null,
    status: state.status,
    queued: state.queue.length,
  };
}

// Resolves as soon as a command arrives, or after `ms`, whichever is first.
export function waitForCommand(ms) {
  return new Promise((resolve) => {
    if (state.queue.length) return resolve();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      state.waiters = state.waiters.filter((w) => w !== finish);
      resolve();
    };
    const timer = setTimeout(finish, ms);
    state.waiters.push(finish);
  });
}
