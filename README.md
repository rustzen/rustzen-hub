# Rustzen Hub

`rustzen-hub` is the Rustzen web surface monorepo.

## Apps

- `apps/site`: Astro website, product pages, download page, docs entry, and about page.
- `apps/console`: Next.js console for dashboard, products, releases, users, settings, billing, and related APIs.

## Packages

- `packages/brand`: Rustzen brand assets, naming, colors, typography, and product metadata.
- `packages/ui`: shared UI components that are used by more than one app.
- `packages/config`: shared TypeScript, ESLint, Tailwind, and build configuration.
- `packages/api-client`: shared API types and client helpers after the console API contract stabilizes.

## Commands

```bash
pnpm install
pnpm build
pnpm lint
pnpm dev:site
pnpm dev:console
```

Run app-specific commands with filters:

```bash
pnpm --filter @rustzen/site build
pnpm --filter @rustzen/console lint
pnpm --filter @rustzen/console build
```

## Migration Notes

- `apps/site` was migrated from `rustzen/rzen-portal`.
- `apps/console` was migrated from `rustzen/rzen-platform`.
- The old repositories should be treated as legacy sources after this monorepo is verified and pushed.
- Generated/local-only directories such as `.vercel/`, `.next/`, `.astro/`, `dist/`, `out/`, and `node_modules/` are not source truth.
