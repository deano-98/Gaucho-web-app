# Ordering flow

1. Customer selects products/options.
2. Basket stores only temporary browser state in localStorage.
3. Customer enters name, phone, email and pickup/delivery details.
4. Client validates the form and submits a UUID idempotency key.
5. `/api/orders` validates again with Zod.
6. Server resolves product IDs, validates flavours/sizes and ignores submitted prices.
7. Server calculates subtotal/delivery fee/total from configured values.
8. Server creates the PostgreSQL order and line items.
9. Server sends a confirmation email. Email failure is recorded as `FAILED` but does not delete the order.
10. Server creates the encoded WhatsApp URL.
11. Browser opens WhatsApp and routes to the confirmation page.
12. Customer must press Send in WhatsApp and wait for business confirmation.
13. Basket is cleared only after the server accepts the order.

## Duplicate protection

The idempotency key is unique in PostgreSQL. Repeated requests return the existing order instead of creating another order. The order number also has a database unique constraint.

## Recovery

Failed emails can be retried through the protected `/api/order-email` endpoint using the server-only `ORDER_ID_SECRET`. Operational tooling should call it only for an existing order ID.
