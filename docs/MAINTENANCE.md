# Maintenance

## Products and prices

Edit `data/products.ts`. Prices are represented in dollars as numbers. Chicken size prices, wing prices, desserts and combo prices are centralized there.

## Promotions

Edit combo `price` and `comboComponents`. The UI calculates the displayed normal combined price from configured component prices and shows the resulting saving.

## Desserts

Add/remove flavour IDs in the relevant product's `flavours` array. Product option IDs should remain stable once real orders exist.

## Business configuration

Edit `data/site-config.ts` for WhatsApp, phone, email, pickup instructions, delivery settings, social links and analytics.

## Images

Replace the SVG placeholders in `public/images/` with optimized food photography. Keep descriptive alt text accurate.

## Database

Back up production PostgreSQL regularly. Define and document a retention period for customer data before launch. Delete/anonymize old orders according to that policy and applicable law.

## Dependencies

Review dependencies regularly. Use a test branch, run typecheck/tests/build, then deploy through Vercel. Avoid upgrading Next/React/Prisma without checking their compatibility together.
