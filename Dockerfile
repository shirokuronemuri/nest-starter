FROM node:20-alpine

RUN corepack enable

WORKDIR /app

ENV DATABASE_URL="postgresql://user:pass@localhost:5432/fakedb"

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

RUN pnpm prune --prod

EXPOSE 6100

CMD ["pnpm", "start:prod"]
