# apps/site Deployment

## Current Deployment Class

`apps/site` is a Vercel static product site deployed for `app.rustzen.dev`. Deployment is governed by `vercel.json` and the Astro build output, not by Rust service deployment conventions.

## Committed Vercel Configuration

`vercel.json` currently declares:

| Field | Value | Fact boundary |
| --- | --- | --- |
| `framework` | `null` | tracked |
| `installCommand` | `pnpm install --frozen-lockfile` | tracked |
| `buildCommand` | `pnpm build` | tracked |
| `outputDirectory` | `dist` | tracked |

`astro.config.mjs` sets `output: 'static'`, so `dist/` is the expected static output directory.

## Local Vercel Link

`.vercel/project.json` may exist locally and is ignored by Git. Treat it as operator-local deployment link metadata only.

Do not copy concrete project, organization, or team identifiers from `.vercel/project.json` into committed docs. Verify those values with Vercel CLI or the Vercel dashboard when deployment work requires them.

## Package Manager And Commands

Package manager: `pnpm`.

Real scripts from `package.json`:

```bash
pnpm dev
pnpm build
pnpm preview
pnpm astro
```

Use the install command from `vercel.json` for clean installs:

```bash
pnpm install --frozen-lockfile
```

## Environment And Secrets

This site should not require database, admin session, webhook, license, or update secrets for the static build unless future source changes introduce them.

Current status:

| Item | Status |
| --- | --- |
| preview env | not verified |
| production env | not verified |
| custom domains | `app.rustzen.dev` verified on Vercel during the rename cleanup |
| serverless/runtime limits | not verified |
| Vercel project/team from committed source | not present |
| Vercel project/team from `.vercel/project.json` | ignored/local-only; verify before use |

Verify with Vercel CLI or the Vercel dashboard before changing deployment settings, domains, or environment variables.

## Generated And Local-Only Files

Ignored output/local state:

- `.vercel/`
- `.astro/`
- `.next/`
- `out/`
- `dist/`
- `.env`
- `.env.local`
- `.env.*.local`

Do not commit generated output or local deployment metadata unless a future task explicitly changes that policy.

## Deployment Change Gate

Before changing deployment behavior, record:

- `git status --short --branch`;
- the exact `vercel.json` diff;
- the package manager and build command;
- the output directory;
- any domain, env, or secret changes;
- whether `pnpm build` and any deployment preview were actually run.

Do not apply Rust service deployment rules such as `/opt`, systemd, Docker, release bundle, or `target/rustzen-*`.
