# Rustzen Site

Rustzen Site is the static official website for the Rustzen macOS tool Zen Clear.

## Scope

- Single-product marketing site for Zen Clear
- Public macOS download entrypoint for Zen Clear
- Creem checkout return page for Pro subscriptions

## Tool

- **Zen Clear**: a lightweight macOS cleaner for developer environments. Pro is
  sold as a Creem annual subscription at $10/year.
- The public download button points at Rustzen Platform's stable latest download
  resolver.

## Stack

- Astro
- Vercel

`pnpm build` exports static files into `dist/`.

## Development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Content Sources

- `docs/current-site-content.md` is a historical snapshot of the previous
  multi-product site, kept for reference only.
