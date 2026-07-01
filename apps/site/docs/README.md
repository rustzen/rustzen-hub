# apps/site Docs

`apps/site` is the Rustzen product site at `app.rustzen.dev`. It is an Astro static site with Vercel deployment configuration.

## Docs

- [Architecture](architecture.md): source layout, page ownership, content collections, and generated boundaries.
- [Deployment](deployment.md): Vercel config, package manager, build output, local-only deployment files, and verification checklist.
- [Content](content.md): product pages, screenshots, SEO/media ownership, and update rules.
- [Current Site Content](current-site-content.md): historical content snapshot captured before the Astro rebuild.

## Current Classification

- Project type: Rustzen product site / Vercel / Astro static site.
- Does not inherit: `/opt`, systemd, Docker, Rust service release bundle, Web admin `apps/server` + `apps/web`, or Tauri client release rules.
- Source truth: tracked Astro, content, data, style, public, and docs files.
- Generated/local-only: `.vercel/`, `.astro/`, `.next/`, `out/`, `dist/`.
