import {
  RATE_LIMIT_RETRY_BASE_MS,
  computeRateLimitBackoffMs,
  parseRetryAfterMs,
  resolveRetryConfig,
  shouldRetryRateLimit,
} from '../../src/client/retry-policy';
import { SupportedRetryPolicy } from '../../src/domain';

describe('retry-policy helpers', () => {
  describe('resolveRetryConfig', () => {
    it('applies defaults when omitted', () => {
      expect(resolveRetryConfig()).toEqual({
        retryPolicy: SupportedRetryPolicy.DEFAULT,
        maxRetryCount: 3,
        exponentialBackoff: 4,
      });
    });

    it('preserves explicit overrides', () => {
      expect(resolveRetryConfig({
        retryPolicy: SupportedRetryPolicy.NONE,
        maxRetryCount: 1,
        exponentialBackoff: 2,
      })).toEqual({
        retryPolicy: SupportedRetryPolicy.NONE,
        maxRetryCount: 1,
        exponentialBackoff: 2,
      });
    });

    it('allows maxRetryCount of 0', () => {
      expect(resolveRetryConfig({ maxRetryCount: 0 }).maxRetryCount).toBe(0);
    });

    it('rejects non-finite or out-of-range numbers', () => {
      expect(() => resolveRetryConfig({ maxRetryCount: Number.NaN }))
        .toThrow('Invalid configuration: "maxRetryCount" must be a non-negative integer');
      expect(() => resolveRetryConfig({ maxRetryCount: -1 }))
        .toThrow('Invalid configuration: "maxRetryCount" must be a non-negative integer');
      expect(() => resolveRetryConfig({ maxRetryCount: 2.9 }))
        .toThrow('Invalid configuration: "maxRetryCount" must be a non-negative integer');
      expect(() => resolveRetryConfig({ exponentialBackoff: Number.POSITIVE_INFINITY }))
        .toThrow('Invalid configuration: "exponentialBackoff" must be a positive number');
      expect(() => resolveRetryConfig({ exponentialBackoff: 0 }))
        .toThrow('Invalid configuration: "exponentialBackoff" must be a positive number');
      expect(() => resolveRetryConfig({ exponentialBackoff: -2 }))
        .toThrow('Invalid configuration: "exponentialBackoff" must be a positive number');
    });

    it('rejects an unrecognized retryPolicy', () => {
      expect(() => resolveRetryConfig({
        retryPolicy: 'UNKNOWN' as SupportedRetryPolicy,
      })).toThrow(
        'Invalid configuration: "retryPolicy" must be DEFAULT, RETRY_AFTER, BACKOFF, or NONE',
      );
    });
  });

  describe('parseRetryAfterMs', () => {
    it('parses delta-seconds', () => {
      expect(parseRetryAfterMs('5')).toBe(5_000);
      expect(parseRetryAfterMs('0')).toBe(0);
      expect(parseRetryAfterMs('  5  ')).toBe(5_000);
    });

    it('ignores negative delta-seconds', () => {
      expect(parseRetryAfterMs('-1')).toBeUndefined();
    });

    it('parses HTTP-date relative to now', () => {
      const future = new Date(Date.now() + 2_000).toUTCString();
      const ms = parseRetryAfterMs(future);
      expect(ms).toBeDefined();
      expect(ms!).toBeGreaterThanOrEqual(0);
      expect(ms!).toBeLessThanOrEqual(2_500);
    });

    describe('RFC 7231 HTTP-date formats', () => {
      const imfFixdate = 'Sun, 06 Nov 1994 08:49:37 GMT';
      const rfc850 = 'Sunday, 06-Nov-94 08:49:37 GMT';
      const asctime = 'Sun Nov  6 08:49:37 1994';
      const instant = Date.parse(imfFixdate);

      beforeEach(() => {
        jest.spyOn(Date, 'now').mockReturnValue(instant);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('accepts the three formats a recipient must parse', () => {
        expect(parseRetryAfterMs(imfFixdate)).toBe(0);
        expect(parseRetryAfterMs(rfc850)).toBe(0);
        expect(parseRetryAfterMs(asctime)).toBe(0);
      });

      it('returns the delay until a future IMF-fixdate', () => {
        expect(parseRetryAfterMs('Sun, 06 Nov 1994 08:49:38 GMT')).toBe(1_000);
      });

      it('treats asctime as GMT and accepts a two-digit day', () => {
        expect(parseRetryAfterMs('Wed Nov 16 08:49:37 1994')).toBe(10 * 24 * 60 * 60 * 1_000);
      });

      it('clamps past dates to 0', () => {
        expect(parseRetryAfterMs('Sun, 06 Nov 1994 08:49:36 GMT')).toBe(0);
      });

      it('parses an HTTP-date with a numeric timezone offset', () => {
        expect(parseRetryAfterMs('Sun, 06 Nov 1994 09:49:37 +0100')).toBe(0);
      });

      it('trims surrounding whitespace', () => {
        expect(parseRetryAfterMs(`  ${imfFixdate}  `)).toBe(0);
      });
    });

    it('returns undefined for absent or invalid values', () => {
      expect(parseRetryAfterMs(undefined)).toBeUndefined();
      expect(parseRetryAfterMs(null)).toBeUndefined();
      expect(parseRetryAfterMs('')).toBeUndefined();
      expect(parseRetryAfterMs('   ')).toBeUndefined();
      expect(parseRetryAfterMs('not-a-date')).toBeUndefined();
    });
  });

  describe('shouldRetryRateLimit', () => {
    const defaults = resolveRetryConfig();

    it('only retries HTTP 429', () => {
      expect(shouldRetryRateLimit(500, 0, defaults)).toBe(false);
      expect(shouldRetryRateLimit(429, 0, defaults)).toBe(true);
    });

    it('stops when maxRetryCount is exhausted', () => {
      expect(shouldRetryRateLimit(429, 3, defaults)).toBe(false);
      expect(shouldRetryRateLimit(429, 2, defaults)).toBe(true);
    });

    it('never retries when policy is NONE', () => {
      const config = resolveRetryConfig({ retryPolicy: SupportedRetryPolicy.NONE });
      expect(shouldRetryRateLimit(429, 0, config, 1_000)).toBe(false);
    });

    it('RETRY_AFTER requires a usable Retry-After delay', () => {
      const config = resolveRetryConfig({ retryPolicy: SupportedRetryPolicy.RETRY_AFTER });
      expect(shouldRetryRateLimit(429, 0, config)).toBe(false);
      expect(shouldRetryRateLimit(429, 0, config, 2_000)).toBe(true);
      expect(shouldRetryRateLimit(429, 0, config, 0)).toBe(true);
    });

    it('BACKOFF retries without a Retry-After delay', () => {
      const config = resolveRetryConfig({ retryPolicy: SupportedRetryPolicy.BACKOFF });
      expect(shouldRetryRateLimit(429, 0, config)).toBe(true);
    });

    it('does not retry an unrecognized policy', () => {
      const config = {
        ...defaults,
        retryPolicy: 'UNKNOWN' as SupportedRetryPolicy,
      };
      expect(shouldRetryRateLimit(429, 0, config)).toBe(false);
    });
  });

  describe('computeRateLimitBackoffMs', () => {
    let randomSpy: jest.SpyInstance;

    beforeEach(() => {
      randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
      randomSpy.mockRestore();
    });

    it('DEFAULT honors Retry-After with jitter', () => {
      const config = resolveRetryConfig();
      // 0s + floor(0.5 * 250) = 125
      expect(computeRateLimitBackoffMs(0, config, 0)).toBe(125);
    });

    it('DEFAULT falls back to full-jitter exponential without header', () => {
      const config = resolveRetryConfig();
      // floor(0.5 * 1000 * 4^0) = 500
      expect(computeRateLimitBackoffMs(0, config)).toBe(500);
      // floor(0.5 * 1000 * 4^1) = 2000
      expect(computeRateLimitBackoffMs(1, config)).toBe(2_000);
    });

    it('BACKOFF ignores Retry-After', () => {
      const config = resolveRetryConfig({ retryPolicy: SupportedRetryPolicy.BACKOFF });
      expect(computeRateLimitBackoffMs(0, config, 0)).toBe(500);
    });

    it('RETRY_AFTER uses header delay only', () => {
      const config = resolveRetryConfig({ retryPolicy: SupportedRetryPolicy.RETRY_AFTER });
      expect(computeRateLimitBackoffMs(0, config, 0)).toBe(125);
    });

    it('respects custom exponentialBackoff growth', () => {
      const config = resolveRetryConfig({ exponentialBackoff: 2 });
      // floor(0.5 * 1000 * 2^2) = 2000
      expect(computeRateLimitBackoffMs(2, config)).toBe(2_000);
      expect(RATE_LIMIT_RETRY_BASE_MS).toBe(1_000);
    });
  });
});
