# SEO

- Root metadata and page-specific metadata live in the App Router.
- `app/sitemap.ts` creates an XML sitemap.
- `app/robots.ts` references the sitemap.
- Canonical URL comes from `NEXT_PUBLIC_SITE_URL`.
- Open Graph image is a replaceable local placeholder.
- `LocalBusinessJsonLd` emits FoodEstablishment structured data only for information that is actually configured.
- Do not add an invented street address, rating, review count or opening hours.
- Replace placeholder image alt text and SVGs with accurate descriptions when real photographs are added.

Target useful local phrases naturally: Braai chicken in Harare, charcoal-braaied chicken Harare, chicken wings Harare, burnt cheesecake Harare and cake boxes Harare. Avoid keyword stuffing.

Test with Google Rich Results Test, Lighthouse, PageSpeed Insights and the production site's sitemap/robots URLs.
