"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { siteConfig } from "@/data/site-config";

export function AnalyticsScripts() {
  const pathname = usePathname();
  useEffect(() => {
    if (!siteConfig.analytics.enabled || !siteConfig.analytics.gaMeasurementId)
      return;
    const ga = (window as Window & { gtag?: (...args: unknown[]) => void })
      .gtag;
    if (ga) ga("event", "page_view", { page_path: pathname });
  }, [pathname]);
  if (!siteConfig.analytics.enabled) return null;
  return (
    <>
      {siteConfig.analytics.gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4"
            strategy="afterInteractive"
          >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};window.gtag=gtag;gtag('js',new Date());gtag('config','${siteConfig.analytics.gaMeasurementId}',{send_page_view:false});`}</Script>
        </>
      )}
      {siteConfig.analytics.clarityProjectId && (
        <Script
          id="clarity"
          strategy="afterInteractive"
        >{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','${siteConfig.analytics.clarityProjectId}');`}</Script>
      )}
    </>
  );
}
