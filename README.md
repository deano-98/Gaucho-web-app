# Braai Chicken

A mobile-first, WhatsApp-first ordering website for a local Zimbabwean charcoal-braai chicken business.

## What it does

- Next.js 16 App Router + TypeScript strict mode.
- Product catalogue driven from `data/products.ts`.
- Client-side persistent basket with flavour/size-aware line items.
- Server-side Zod validation and price verification.
- PostgreSQL + Prisma order persistence.
- Secure server-generated order numbers and idempotency protection.
- WhatsApp click-to-chat handoff.
- Resend confirmation email with retry endpoint.
- GA4, Microsoft Clarity, Vercel Analytics and Speed Insights integration points.
- SEO metadata, sitemap, robots and FoodEstablishment JSON-LD.
- Unit tests with Vitest and browser tests with Playwright.

## Prerequisites

- Node.js 22 LTS or newer compatible Node 22 release.
- npm.
- PostgreSQL for real order persistence.
- A Resend account for customer email confirmations.
- A Vercel project for deployment.

## Install

```bash
npm install
cp .env.example .env.local
npm run db:generate
npm run db:push
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## Important manual setup

Do not ship the placeholders. Edit `data/site-config.ts` and `.env.local` with the real WhatsApp number, phone, email, domain, pickup instructions, hours, delivery settings, analytics IDs, Resend credentials and database connection.

The bun is intentionally disabled until its price is entered in `data/products.ts`.

Actual food photographs, logo and social links are also manual inputs. Placeholder SVGs are included only so the project runs immediately.

## Production rule

The database is part of the production ordering path. Do not describe browser localStorage as order storage. LocalStorage is only the temporary customer basket.

See `docs/` for the complete setup, architecture, ordering, analytics, SEO, deployment and maintenance guides.
