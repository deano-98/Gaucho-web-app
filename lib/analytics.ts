export type AnalyticsEvent =
  | "view_item"
  | "add_to_cart"
  | "view_cart"
  | "begin_checkout"
  | "order_submission_attempt"
  | "order_created";

export function trackEvent(event: AnalyticsEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const ga = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (!ga) return;
  ga("event", event, params);
}
