FROM oven/bun:alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install

FROM deps AS builder
WORKDIR /app
COPY . .
RUN bun run build

FROM builder AS production
WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "start"]
