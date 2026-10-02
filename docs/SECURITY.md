# Security

- Zod validates every public order request on the server.
- Server product data controls prices; client prices are ignored.
- PostgreSQL unique constraints provide idempotency and order-number uniqueness.
- API keys are server-only environment variables.
- HTTP security headers are configured in `next.config.ts`.
- Order submission has a rate limiter. Replace the included process-local limiter with a shared provider before meaningful multi-instance traffic.
- Customer form fields are explicitly marked for Clarity masking.
- Customer names/emails/phones/addresses are not sent to analytics events.
- API errors are intentionally generic at the boundary; do not add customer data to logs.
- WhatsApp messages are URL-encoded as one complete message.
- The internal email retry endpoint requires the server-only `ORDER_ID_SECRET`.
- Use HTTPS in production.
- Define a customer-data retention/deletion policy before launch.

Remaining risks include abuse/spam, credential compromise, dependency vulnerabilities and operational mistakes. Review these periodically.
