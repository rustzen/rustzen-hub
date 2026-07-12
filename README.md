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
npm install
npm run build
npm run lint
npm run dev:site
npm run dev:console
```

Run app-specific commands with filters:

```bash
npm run build --workspace @rustzen/site
npm run lint --workspace @rustzen/console
npm run build --workspace @rustzen/console
```

## Migration Notes

- `apps/site` was migrated from `rustzen/rzen-portal`.
- `apps/console` was migrated from `rustzen/rzen-platform`.
- The old repositories should be treated as legacy sources after this monorepo is verified and pushed.
- Generated/local-only directories such as `.vercel/`, `.next/`, `.astro/`, `dist/`, `out/`, and `node_modules/` are not source truth.

## Ownership and Commercial Rights

Ownership, branding, trademark, domain, hosted-service, package publishing, and
commercial-use boundaries are documented in [NOTICE.md](./NOTICE.md).
