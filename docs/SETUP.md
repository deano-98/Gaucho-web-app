# Setup

## Mac

1. Install Node.js 22 LTS.
2. Clone the repository.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Install/run PostgreSQL or use a managed PostgreSQL provider.
6. Set `DATABASE_URL`.
7. Run `npm run db:generate` and `npm run db:push`.
8. Set the business configuration in `data/site-config.ts`.
9. Run `npm run dev`.

## Windows

Use PowerShell or Windows Terminal. Install Node.js 22 LTS, Git and PostgreSQL (or use managed PostgreSQL). Then run the same npm commands above. PowerShell supports `Copy-Item .env.example .env.local` if `cp` is unavailable.

## Troubleshooting

- Prisma client errors: run `npm run db:generate`.
- Database connection errors: check `DATABASE_URL`, network access and PostgreSQL credentials.
- Placeholder business information: edit `data/site-config.ts` and `.env.local`.
- Email not sending: verify `RESEND_API_KEY` and `EMAIL_FROM`.
- WhatsApp opens the wrong destination: check `NEXT_PUBLIC_WHATSAPP_NUMBER` in international digits without `+` or spaces.
