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

## Contracts

- `contracts/entitlements/v1.json`: authoritative Rustzen Pro product,
  feature, protocol, and runtime-policy registry.
- Rustzen Tools may keep an exact versioned snapshot, but it is not a second
  policy authority.

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

## License and Commercial Rights

This repository is proprietary. See [LICENSE.md](./LICENSE.md),
[LICENSE-SCOPE.md](./LICENSE-SCOPE.md), [NOTICE.md](./NOTICE.md),
[TRADEMARKS.md](./TRADEMARKS.md), and
[THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
