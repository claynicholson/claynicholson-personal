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

# openssh-keygen needed at runtime if no host key is mounted
RUN apk add --no-cache openssh-keygen

EXPOSE 2222

COPY ssh-server/entrypoint.sh /app/ssh-server/entrypoint.sh
RUN chmod +x /app/ssh-server/entrypoint.sh

ENTRYPOINT ["/app/ssh-server/entrypoint.sh"]
