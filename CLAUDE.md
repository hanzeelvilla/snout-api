# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

`snout-api` is a NestJS (v11) TypeScript API, currently at the freshly-scaffolded stage (default `@nestjs/cli` starter: a single root `AppModule` / `AppController` / `AppService`). It uses pnpm as the package manager.

A PostgreSQL 17 database is provisioned via `docker-compose.yaml`, with data persisted to `./postgres` on the host. There is no ORM or database client wired into the app yet (no TypeORM/Prisma/pg in `package.json`) — when adding data-access code, check `package.json` first to see what's been introduced since this file was written.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`) — use `pnpm`, not `npm`/`yarn`.

```bash
pnpm install              # install dependencies

pnpm run start             # start (no watch)
pnpm run start:dev         # start in watch mode (typical for local dev)
pnpm run start:debug       # start with --inspect + watch
pnpm run start:prod        # run compiled dist/main.js

pnpm run build              # nest build -> dist/

pnpm run lint                # eslint --fix over src/apps/libs/test
pnpm run format               # prettier --write src/**/*.ts test/**/*.ts

pnpm run test                # jest unit tests (*.spec.ts, colocated under src/)
pnpm run test:watch          # jest --watch
pnpm run test:cov            # jest --coverage
pnpm run test:e2e            # e2e tests via test/jest-e2e.json (*.e2e-spec.ts)
pnpm run test:debug          # jest --runInBand under the node inspector
```

Run a single unit test file: `pnpm test -- app.controller.spec.ts` (jest `rootDir` is `src`, pattern `*.spec.ts`).
Run a single e2e test file: `pnpm run test:e2e -- test/app.e2e-spec.ts`.

### Local database

```bash
docker compose up -d db     # starts postgres:17 on ${DB_PORT}, db ${DB_NAME}
```

Requires a `.env` with `DB_PORT`, `DB_NAME`, `DB_PASSWORD` (gitignored). The `./postgres` directory is the container's bind-mounted data directory — treat it as generated database state, not source, and never hand-edit files under it.

## Architecture

- Standard Nest module/controller/service layering, entry point `src/main.ts` boots `AppModule` via `NestFactory` and listens on `process.env.PORT` (default 3000).
- `nest-cli.json` sets `sourceRoot: src`; compiled output goes to `dist/` (`tsconfig.build.json` extends the root `tsconfig.json`, excluding `test/` and `*.spec.ts`).
- `tsconfig.json` targets ES2023 with `nodenext` module resolution, decorators/metadata enabled (required for Nest DI), `strictNullChecks` on but `noImplicitAny` off.
- As real domain functionality is added, follow Nest convention: one feature module per bounded concern (its own controller/service/module files), registered in `AppModule.imports`, rather than growing `AppController`/`AppService` directly.

## Lint/format

ESLint flat config (`eslint.config.mjs`) extends `typescript-eslint` recommendedTypeChecked + `eslint-plugin-prettier`, with `@typescript-eslint/no-explicit-any` off and `no-floating-promises`/`no-unsafe-argument` downgraded to warnings. Prettier config (`.prettierrc`): single quotes, trailing commas everywhere. `pnpm run lint` auto-fixes.
