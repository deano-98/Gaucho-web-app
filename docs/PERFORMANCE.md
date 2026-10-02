# Performance

Targets:

- LCP: < 2.5s on a representative mobile connection.
- INP: < 200ms.
- CLS: < 0.1.

The project uses `next/image`, server components by default, small client boundaries, local SVG placeholders and lightweight CSS animations. Replace placeholders with compressed WebP/AVIF food photography sized for the rendered container.

Monitor production performance in Vercel Speed Insights and periodically run Lighthouse on mobile. Investigate slow LCP images, hydration-heavy components and third-party analytics if Core Web Vitals regress.
