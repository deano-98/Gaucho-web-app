# Architecture

## Layers

- `app/`: routes, metadata, API route handlers.
- `components/`: presentation and interactive UI.
- `context/`: browser basket state only.
- `data/`: business-owned catalogue/configuration.
- `lib/`: validation, pricing, WhatsApp, email, analytics, persistence helpers.
- `types/`: shared TypeScript contracts.
- `prisma/`: persistent order schema.

## Server/client boundary

Server Components are used for static pages and catalogue composition. Client Components are limited to basket state, product controls, forms and analytics calls that require browser APIs.

The browser never controls the authoritative price. It submits product IDs/options only; the server resolves those IDs against `data/products.ts` and recalculates totals.

## Order data flow

`BasketContext -> OrderForm -> POST /api/orders -> Zod -> server product lookup -> price calculation -> PostgreSQL -> email attempt -> WhatsApp URL -> confirmation page`.

The order is persisted before WhatsApp handoff. An email failure updates the order's email status rather than deleting the order.

## Reliability

The database has unique constraints on `orderNumber` and `idempotencyKey`. The API retries order-number allocation after a collision. Repeated submissions using the same idempotency key return the already-created order.

## Rate limiting

The included limiter is process-local and is useful as a first line of defence. Vercel multi-instance production should use a shared rate-limit store such as Vercel KV/Upstash before significant traffic.
