import { SupportedRetryPolicy, WithRetryPolicy } from '../domain';

/** Base delay for full-jitter exponential backoff (1 second). */
export const RATE_LIMIT_RETRY_BASE_MS = 1_000;

const DEFAULT_MAX_RETRY_COUNT = 3;
const DEFAULT_EXPONENTIAL_BACKOFF = 4;

/** @internal */
export interface ResolvedRetryConfig {
  retryPolicy: SupportedRetryPolicy;
  maxRetryCount: number;
  exponentialBackoff: number;
}

const isSupportedRetryPolicy = (value: unknown): value is SupportedRetryPolicy =>
  value === SupportedRetryPolicy.DEFAULT
  || value === SupportedRetryPolicy.RETRY_AFTER
  || value === SupportedRetryPolicy.BACKOFF
  || value === SupportedRetryPolicy.NONE;

const resolveInteger = (value: number | undefined, fallback: number, min: number): number => {
  if (value === undefined || !Number.isFinite(value) || value < min) {
    return fallback;
  }
  return Math.floor(value);
};

const resolveExponentialBackoff = (value: number | undefined): number => {
  if (value === undefined || !Number.isFinite(value) || value <= 0) {
    return DEFAULT_EXPONENTIAL_BACKOFF;
  }
  return value;
};

/** @internal */
export const resolveRetryConfig = (partial?: WithRetryPolicy): ResolvedRetryConfig => {
  const retryPolicy = partial?.retryPolicy;
  return {
    retryPolicy: isSupportedRetryPolicy(retryPolicy)
      ? retryPolicy
      : SupportedRetryPolicy.DEFAULT,
    maxRetryCount: resolveInteger(partial?.maxRetryCount, DEFAULT_MAX_RETRY_COUNT, 0),
    exponentialBackoff: resolveExponentialBackoff(partial?.exponentialBackoff),
  };
};

/**
 * ANSI C asctime() form from RFC 7231 §7.1.1.1 (`Sun Nov  6 08:49:37 1994`).
 * It has no timezone; the spec treats it as GMT. `Date.parse` otherwise uses local time.
 */
const ASCTIME_HTTP_DATE = /^[A-Za-z]{3} [A-Za-z]{3} [\d ]\d \d{2}:\d{2}:\d{2} \d{4}$/;

const toParseableHttpDate = (value: string): string =>
  ASCTIME_HTTP_DATE.test(value) ? `${value} GMT` : value;

/**
 * Parse an RFC 7231 `Retry-After` value (delta-seconds or HTTP-date) to milliseconds.
 * Negative delta-seconds are ignored. Returns undefined when the value is absent or invalid.
 */
/** @internal */
export const parseRetryAfterMs = (value: string | null | undefined): number | undefined => {
  if (value === null || value === undefined) {
    return undefined;
  }
  const trimmed = value.trim();
  if (trimmed === '') {
    return undefined;
  }
  const asNumber = Number(trimmed);
  if (Number.isFinite(asNumber)) {
    // Negative delta-seconds are ignored per the retry policy spec.
    if (asNumber < 0) {
      return undefined;
    }
    return Math.floor(asNumber * 1000);
  }
  const asDate = Date.parse(toParseableHttpDate(trimmed));
  if (!Number.isNaN(asDate)) {
    return Math.max(0, asDate - Date.now());
  }
  return undefined;
};

/**
 * Whether the SDK should retry this response for the given attempt index (0 = first retry).
 * `retryAfterMs` is the already-parsed `Retry-After` delay (undefined if absent/invalid).
 */
/** @internal */
export const shouldRetryRateLimit = (
  status: number,
  attempt: number,
  config: ResolvedRetryConfig,
  retryAfterMs?: number,
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
    return retryAfterMs !== undefined;
  }
  return config.retryPolicy === SupportedRetryPolicy.DEFAULT
    || config.retryPolicy === SupportedRetryPolicy.BACKOFF;
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
  retryAfterMs?: number,
): number => {
  const useRetryAfter = config.retryPolicy === SupportedRetryPolicy.DEFAULT
    || config.retryPolicy === SupportedRetryPolicy.RETRY_AFTER;
  const useBackoff = config.retryPolicy === SupportedRetryPolicy.DEFAULT
    || config.retryPolicy === SupportedRetryPolicy.BACKOFF;

  if (useRetryAfter && retryAfterMs !== undefined) {
    // Small jitter so concurrent SinchClient instances don't all wake together.
    return retryAfterMs + Math.floor(Math.random() * 250);
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
