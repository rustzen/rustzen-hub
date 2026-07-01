# apps/site Architecture

## Classification

`apps/site` is the Rustzen product site. It publishes the Zen Clear product page and Creem checkout return at `app.rustzen.dev`. It is not a Rust backend, Web admin dashboard, Tauri client, or release bundle project.

## Stack

- Astro static output (`astro.config.mjs` sets `output: 'static'`).
- TypeScript data module for product metadata.
- Vercel static deployment using `vercel.json`.

## Source Layout

| Path | Role | Fact boundary |
| --- | --- | --- |
| `src/pages/index.astro` | Home page and Zen Clear landing. | tracked source |
| `src/pages/checkout/success.astro` | Static checkout return page for completed Creem purchases. | tracked source |
| `src/layouts/SiteLayout.astro` | Shared document shell, footer, and metadata baseline. | tracked source |
| `src/data/product.ts` | Zen Clear name, status, description, highlights, proof, download, and purchase copy. | tracked source |
| `public/*` | Static public assets, icons, fonts, and product media. | tracked or untracked until added |
| `docs/*` | Governance and content records. | tracked or modified tracked |

## Routes

- `/`: Zen Clear landing page.
- `/checkout/success`: static return page after a completed Creem checkout.

Zen Clear purchase copy is owned by `src/data/product.ts`. The current public
offer is Pro as an annual Creem subscription at `$10/year`, linking through
`apps/console` at `/api/billing/checkout?product=rustzen-clear&source=site`.

Zen Clear download copy is also owned by `src/data/product.ts`. The public
download button links through `apps/console` at `/api/updates/download/latest`, which
resolves the current package from the update manifest instead of hard-coding a
specific release version.

## Boundaries

The site has no frontend/backend API contract in this repository. Pages are
pre-rendered from `src/pages` and `src/data/product.ts` during the Astro static
build.

Do not introduce Rust service deployment assumptions here:

- no `/opt/site`;
- no systemd unit;
- no Docker release rule;
- no `target/site`;
- no `apps/server` or `apps/web` migration;
- no Tauri updater/signing/capabilities rules.

Generated and local-only output must not become source truth:

- `.vercel/` is ignored local deployment link metadata;
- `.astro/`, `.next/`, `out/`, and `dist/` are ignored generated output or stale framework output;
- source, docs, and public assets must be reviewed through Git.
