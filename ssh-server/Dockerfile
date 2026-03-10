FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

# Generate host key if not present
RUN if [ ! -f host.key ]; then \
      apk add --no-cache openssh-keygen && \
      ssh-keygen -t ed25519 -f host.key -N "" && \
      apk del openssh-keygen; \
    fi

EXPOSE 2222

CMD ["node", "index.js"]
