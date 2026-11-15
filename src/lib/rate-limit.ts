import { Redis } from '@upstash/redis';

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

export const rateLimiters = {
  auth: { limit: 10, window: '1m' },
  api: { limit: 100, window: '1m' },
  export: { limit: 20, window: '1h' },
  ai: { limit: 10, window: '1d' },
  search: { limit: 60, window: '1m' },
} as const;

export type RateLimiterKey = keyof typeof rateLimiters;

function parseWindow(window: string): number {
  const match = window.match(/^(\d+)([mhd])$/);
  if (!match || !match[1] || !match[2]) return 60;
  const value = Number.parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case 'm':
      return value * 60;
    case 'h':
      return value * 3600;
    case 'd':
      return value * 86400;
    default:
      return 60;
  }
}

export async function rateLimit(
  key: RateLimiterKey,
  identifier: string,
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const config = rateLimiters[key];
  const windowSeconds = parseWindow(config.window);
  const redisKey = `ratelimit:${key}:${identifier}`;

  if (!redis) {
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit,
      reset: Date.now() + windowSeconds * 1000,
    };
  }

  const current = await redis.incr(redisKey);
  if (current === 1) {
    await redis.expire(redisKey, windowSeconds);
  }

  const ttl = await redis.ttl(redisKey);
  const reset = Date.now() + (ttl > 0 ? ttl : windowSeconds) * 1000;

  return {
    success: current <= config.limit,
    limit: config.limit,
    remaining: Math.max(0, config.limit - current),
    reset,
  };
}

export function getRateLimitHeaders(result: Awaited<ReturnType<typeof rateLimit>>) {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.reset / 1000).toString(),
  };
}
