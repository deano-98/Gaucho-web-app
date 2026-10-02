# Environment variables

| Variable                         | Client? | Purpose                                               |
| -------------------------------- | ------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Yes     | Canonical production URL.                             |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`    | Yes     | WhatsApp number used by click-to-chat.                |
| `NEXT_PUBLIC_BUSINESS_PHONE`     | Yes     | Display phone.                                        |
| `NEXT_PUBLIC_BUSINESS_EMAIL`     | Yes     | Display/reply email.                                  |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | Yes     | GA4 measurement ID.                                   |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Yes     | Microsoft Clarity project ID.                         |
| `NEXT_PUBLIC_ENABLE_ANALYTICS`   | Yes     | Set `true` only after consent/configuration is ready. |
| `DATABASE_URL`                   | No      | PostgreSQL connection string.                         |
| `RESEND_API_KEY`                 | No      | Resend server credential.                             |
| `EMAIL_FROM`                     | No      | Verified sender address.                              |
| `ORDER_RATE_LIMIT_MAX`           | No      | Order attempts allowed per rate window.               |
| `ORDER_RATE_LIMIT_WINDOW_MS`     | No      | Rate-limit window.                                    |
| `ORDER_ID_SECRET`                | No      | Secret for internal email retry endpoint.             |

Never commit `.env.local`. In Vercel, add production/preview/development values through Project Settings → Environment Variables.
