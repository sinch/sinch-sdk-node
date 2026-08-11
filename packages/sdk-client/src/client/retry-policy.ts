import { RetryPolicy, SupportedRetryPolicy, WithRetryPolicy } from '../domain';

/** Base delay for full-jitter exponential backoff (1 second). */
export const RATE_LIMIT_RETRY_BASE_MS = 1_000;

const DEFAULT_MAX_RETRY_COUNT = 3;
const DEFAULT_EXPONENTIAL_BACKOFF = 4;

/** @internal */
export interface ResolvedRetryConfig {
  retryPolicy: RetryPolicy;
  maxRetryCount: number;
  exponentialBackoff: number;
}

/** @internal */
export const resolveRetryConfig = (partial?: WithRetryPolicy): ResolvedRetryConfig => ({
  retryPolicy: partial?.retryPolicy ?? SupportedRetryPolicy.DEFAULT,
  maxRetryCount: partial?.maxRetryCount ?? DEFAULT_MAX_RETRY_COUNT,
  exponentialBackoff: partial?.exponentialBackoff ?? DEFAULT_EXPONENTIAL_BACKOFF,
});

/**
 * Parse an RFC 7231 `Retry-After` value (delta-seconds or HTTP-date) to milliseconds.
 * Negative delta-seconds are ignored. Returns undefined when the value is absent or invalid.
 */
/** @internal */
export const parseRetryAfterMs = (value: string | null | undefined): number | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }
  const asNumber = Number(value);
  if (!Number.isNaN(asNumber)) {
    // Negative delta-seconds are ignored per the retry policy spec.
    if (asNumber < 0) {
      return undefined;
    }
    return Math.floor(asNumber * 1000);
  }
  const asDate = Date.parse(value);
  if (!Number.isNaN(asDate)) {
    return Math.max(0, asDate - Date.now());
  }
  return undefined;
};

/**
 * Whether the SDK should retry an HTTP 429 for the given attempt index (0 = first retry).
 */
/** @internal */
export const shouldRetryRateLimit = (
  status: number,
  attempt: number,
  config: ResolvedRetryConfig,
  retryAfterHeader?: string | null,
): boolean => {
  if (status !== 429) {
    return false;
  }
  if (config.retryPolicy === SupportedRetryPolicy.NONE) {
    return false;
  }
  if (attempt >= config.maxRetryCount) {
    return false;
  }
  if (config.retryPolicy === SupportedRetryPolicy.RETRY_AFTER) {
    return parseRetryAfterMs(retryAfterHeader) !== undefined;
  }
  return true;
};

/**
 * Backoff delay for a rate-limit retry, respecting the configured policy.
 * - DEFAULT: Retry-After (+ 0–250ms jitter) when parseable, else full-jitter exponential
 * - RETRY_AFTER: Retry-After (+ jitter) only (caller must have validated the header)
 * - BACKOFF: full-jitter exponential only
 */
/** @internal */
export const computeRateLimitBackoffMs = (
  attempt: number,
  config: ResolvedRetryConfig,
  retryAfterHeader?: string | null,
): number => {
  const useRetryAfter = config.retryPolicy === SupportedRetryPolicy.DEFAULT
    || config.retryPolicy === SupportedRetryPolicy.RETRY_AFTER;
  const useBackoff = config.retryPolicy === SupportedRetryPolicy.DEFAULT
    || config.retryPolicy === SupportedRetryPolicy.BACKOFF;

  if (useRetryAfter) {
    const fromHeader = parseRetryAfterMs(retryAfterHeader);
    if (fromHeader !== undefined) {
      // Small jitter so concurrent SinchClient instances don't all wake together.
      return fromHeader + Math.floor(Math.random() * 250);
    }
  }

  if (useBackoff) {
    const ceilingMs = RATE_LIMIT_RETRY_BASE_MS * Math.pow(config.exponentialBackoff, attempt);
    return Math.floor(Math.random() * ceilingMs);
  }

  return 0;
};

/** @internal */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
