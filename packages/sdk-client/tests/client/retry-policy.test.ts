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
  });

  describe('parseRetryAfterMs', () => {
    it('parses delta-seconds', () => {
      expect(parseRetryAfterMs('5')).toBe(5_000);
      expect(parseRetryAfterMs('0')).toBe(0);
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

    it('returns undefined for absent or invalid values', () => {
      expect(parseRetryAfterMs(undefined)).toBeUndefined();
      expect(parseRetryAfterMs(null)).toBeUndefined();
      expect(parseRetryAfterMs('')).toBeUndefined();
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
      expect(shouldRetryRateLimit(429, 0, config, '1')).toBe(false);
    });

    it('RETRY_AFTER requires a usable Retry-After header', () => {
      const config = resolveRetryConfig({ retryPolicy: SupportedRetryPolicy.RETRY_AFTER });
      expect(shouldRetryRateLimit(429, 0, config)).toBe(false);
      expect(shouldRetryRateLimit(429, 0, config, '2')).toBe(true);
      expect(shouldRetryRateLimit(429, 0, config, 'bogus')).toBe(false);
    });

    it('BACKOFF retries without a Retry-After header', () => {
      const config = resolveRetryConfig({ retryPolicy: SupportedRetryPolicy.BACKOFF });
      expect(shouldRetryRateLimit(429, 0, config)).toBe(true);
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
      expect(computeRateLimitBackoffMs(0, config, '0')).toBe(125);
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
      expect(computeRateLimitBackoffMs(0, config, '0')).toBe(500);
    });

    it('RETRY_AFTER uses header delay only', () => {
      const config = resolveRetryConfig({ retryPolicy: SupportedRetryPolicy.RETRY_AFTER });
      expect(computeRateLimitBackoffMs(0, config, '0')).toBe(125);
    });

    it('respects custom exponentialBackoff growth', () => {
      const config = resolveRetryConfig({ exponentialBackoff: 2 });
      // floor(0.5 * 1000 * 2^2) = 2000
      expect(computeRateLimitBackoffMs(2, config)).toBe(2_000);
      expect(RATE_LIMIT_RETRY_BASE_MS).toBe(1_000);
    });
  });
});
