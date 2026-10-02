# Analytics

## GA4

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and enable analytics after implementing the business's consent requirements. Events include `view_item`, `add_to_cart`, `view_cart`, `begin_checkout`, `order_submission_attempt` and `order_created`.

No names, emails, phone numbers, addresses, WhatsApp messages or full order contents are sent as event parameters.

## Microsoft Clarity

Set `NEXT_PUBLIC_CLARITY_PROJECT_ID`. Review Clarity masking defaults and verify that all order form fields are masked before production use. Never add customer details to custom Clarity tags.

## Vercel Analytics / Speed Insights

They are included in the root layout. Verify the project is deployed to Vercel and inspect the dashboards after real traffic arrives.

## Consent

The analytics flag defaults to false. Before enabling GA4/Clarity for public traffic, document the site's consent/legal basis and privacy notice appropriate to the business's jurisdictions.
