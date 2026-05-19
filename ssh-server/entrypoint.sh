#!/bin/sh
if [ ! -f /app/ssh-server/host.key ]; then
  echo "No host key found — generating one."
  ssh-keygen -t ed25519 -f /app/ssh-server/host.key -N ""
fi
exec node /app/ssh-server/index.js
