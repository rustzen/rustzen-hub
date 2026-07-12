# Rustzen Platform

Rustzen Platform is the admin dashboard and platform API surface for Rustzen macOS products.

## Scope

- Product, license, device, order, and version management dashboard
- License activation and version-check API routes
- Billing checkout and webhook handling for Rustzen Clear Pro
- Legacy Lemon Squeezy webhook handling
- License server proxy endpoints
- PostgreSQL access through Prisma

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Vercel

## Development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run db:generate
npm run db:verify
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and configure the database, dashboard auth,
license server, billing provider API key, product identifier, and webhook secrets.

For local database validation, PostgreSQL 17 from Homebrew was used with a local
`rustzen_console_test` database.
