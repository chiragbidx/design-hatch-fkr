FROM ghcr.io/chiragbidx/saas-base:latest

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

COPY package.json pnpm-lock.yaml ./
RUN rm -rf node_modules && pnpm install --prefer-offline --no-frozen-lockfile

COPY . .

CMD ["node", "scripts/dev-supervisor.js"]
