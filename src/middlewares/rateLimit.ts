import { Request, Response as ExpressResponse, NextFunction } from 'express';
import Response from '../utils/response';

interface RateLimitOptions {
  windowMs?: number;
  max?: number;
}

interface Bucket {
  count: number;
  resetAt: number;
}

export const rateLimit = ({ windowMs = 60_000, max = 10 }: RateLimitOptions = {}) => {
  const buckets = new Map<string, Bucket>();

  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) {
        buckets.delete(key);
      }
    }
  }, windowMs).unref();

  return (req: Request, res: ExpressResponse, next: NextFunction) => {
    const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();
    let bucket = buckets.get(clientIp);

    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(clientIp, bucket);
    }

    bucket.count += 1;
    res.set('X-RateLimit-Limit', String(max));
    res.set('X-RateLimit-Remaining', String(Math.max(max - bucket.count, 0)));

    if (bucket.count > max) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      res.set('Retry-After', String(retryAfter));
      return Response(
        res,
        429,
        false,
        `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
        null,
      );
    }

    next();
  };
};
