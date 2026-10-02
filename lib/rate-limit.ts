type Bucket = { count: number; resetAt: number };

// This in-memory limiter is intentionally a lightweight first line of defence.
// For multi-instance production deployments, replace it with Vercel KV/Upstash or another shared store.
const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }
  if (current.count >= max) return { allowed: false, remaining: 0, retryAfterMs: current.resetAt - now };
  current.count += 1;
  return { allowed: true, remaining: max - current.count };
}
