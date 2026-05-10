FROM node:20-alpine

WORKDIR /app

# Install deps using just the manifest first (caches the layer).
COPY ssh-server/package*.json ./ssh-server/
WORKDIR /app/ssh-server
RUN npm ci --production

# Copy ssh-server source + the shared content layer (require("../shared/...")).
WORKDIR /app
COPY ssh-server/ ./ssh-server/
COPY shared/   ./shared/

WORKDIR /app/ssh-server

# Generate host key if not present
RUN if [ ! -f host.key ]; then \
      apk add --no-cache openssh-keygen && \
      ssh-keygen -t ed25519 -f host.key -N "" && \
      apk del openssh-keygen; \
    fi

EXPOSE 2222

CMD ["node", "index.js"]
