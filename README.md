# nest-starter

## Description

[Nest](https://github.com/nestjs/nest) framework starter project. It includes test coverage, some middlewares, request body validation with zod, logging, prisma + postgres, redis caching and github actions for automated testing and deployment to a remote server.

## Project setup

create `.env`, `.env.test` and `.env.production` files based on `.env.example`, then:

```bash
$ pnpm install

# apply migrations and generate prisma client
$ pnpm db:m:dev
```

## Compile and run the project

```bash
# development
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

```

## API

Swagger docs for the server are available at the `/docs` route.
