# Deployment

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Add all `.env.example` variables in Vercel.
4. Provision PostgreSQL and set `DATABASE_URL`.
5. Run the production migration workflow. For a controlled production database, prefer Prisma migrations over `db push`.
6. Verify the Resend sending domain and `EMAIL_FROM`.
7. Configure the production domain and HTTPS.
8. Replace placeholder food images/logo and business details.
9. Test a complete order using a real email and the business WhatsApp number.
10. Verify the email, database record and WhatsApp message.
11. Verify GA4, Clarity, Vercel Analytics and Speed Insights.
12. Run Lighthouse on mobile.

## Production checklist

- [ ] Real WhatsApp number
- [ ] Real email sender
- [ ] PostgreSQL configured
- [ ] Resend verified
- [ ] Delivery settings confirmed
- [ ] Bun price configured or product intentionally disabled
- [ ] Westgate/Avondale pickup instructions added
- [ ] Business hours added if published
- [ ] Real photography added
- [ ] Privacy/consent notice published
- [ ] Rate limit moved to shared storage for meaningful scale
