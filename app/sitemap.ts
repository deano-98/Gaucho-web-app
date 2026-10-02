import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: siteConfig.url, lastModified: new Date() }, { url: `${siteConfig.url}/menu`, lastModified: new Date() }, { url: `${siteConfig.url}/basket`, lastModified: new Date() }]; }
