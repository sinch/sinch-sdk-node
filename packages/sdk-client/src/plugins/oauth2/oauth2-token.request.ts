import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin, RequestPluginEnum } from '../core/request-plugin';
import { AdditionalHeadersRequest } from '../additional-headers';
import { ApiClient } from '../../api/api-client';
import { OAuth2Api } from './oauth2-api';
import { BasicAuthenticationRequest } from '../basicAuthentication';
import { ApiFetchClient } from '../../client/api-fetch-client';
import { AUTH_HOSTNAME } from '../../domain';
import { RequestFailedError } from '../../api/api-errors';

const EXPIRY_SAFETY_MARGIN_SEC = 60;

/**
 * Token-fetch 429 backoff. ZAP is a token bucket: capacity 30, refill 10/s,
 * no `Retry-After` header. With N SinchClient instances cold-starting
 * concurrently, the first 30 succeed and the rest get 429s; this backoff
 * absorbs that overflow silently.
 *
 * Full-jitter exponential backoff: each retry waits a uniform sample from
 * [0, ceiling], where ceiling grows by RATE_LIMIT_RETRY_GROWTH each attempt.
 * Jitter is necessary and essential: without it, multiple workers' retries
 * collide at the same wall-clock instant and re-trigger the rate limit.
 */
const MAX_RATE_LIMIT_RETRIES = 3;
const RATE_LIMIT_RETRY_BASE_MS = 1_000;
const RATE_LIMIT_RETRY_GROWTH = 4;

export class Oauth2TokenRequest implements RequestPlugin {
  private readonly apiClient: ApiClient;

  private token: AccessToken | undefined;

  /** Shared promise for concurrent token refresh */
  private pendingTokenRefresh: Promise<{ [key: string]: string }> | null = null;

  getName(): string {
    return RequestPluginEnum.OAUTH2_TOKEN_REQUEST;
  }

  constructor(
    clientId: string,
    clientSecret: string,
    authenticationUrl?: string,
  ) {
    const basicAuthenticationPlugin = new BasicAuthenticationRequest(
      clientId,
      clientSecret,
    );
    if (!authenticationUrl) {
      authenticationUrl = AUTH_HOSTNAME;
    }
    this.apiClient = new ApiFetchClient({
      hostname: authenticationUrl,
      requestPlugins: [basicAuthenticationPlugin],
    });
  }

  private async getOAuth2Token(): Promise<{ [key: string]: string }> {
    if (this.isTokenValid()) {
      return this.buildAuthorizationHeader();
    }

    // If a token refresh is already happening, share the same promise.
    // This prevents N concurrent requests from making N auth server calls.
    if (this.pendingTokenRefresh) {
      return this.pendingTokenRefresh;
    }

    this.pendingTokenRefresh = this.fetchNewToken();
    try {
      return await this.pendingTokenRefresh;
    } finally {
      this.pendingTokenRefresh = null;
    }
  }

  private async fetchNewToken(): Promise<{ [key: string]: string }> {
    const oauth2Api = new OAuth2Api(this.apiClient);
    const response = await this.callAuthWithRateLimitRetry(oauth2Api);
    if (!response.access_token) {
      this.token = undefined;
      throw new Error(
        'The authentication server did not return an access_token. Response keys: ['
          + Object.keys(response).join(', ') + ']',
      );
    }
    this.token = {
      value: response.access_token,
      status: TokenStatus.VALID,
      exp: decodeJwtExp(response.access_token),
    };
    return this.buildAuthorizationHeader();
  }

  /**
   * Call the auth endpoint, retrying only on 429 with full-jitter backoff.
   * Other failures (network, 5xx, malformed response) propagate immediately
   */
  private async callAuthWithRateLimitRetry(oauth2Api: OAuth2Api) {
    for (let attempt = 0; ; attempt++) {
      try {
        return await oauth2Api.postAccessToken();
      } catch (e) {
        if (attempt < MAX_RATE_LIMIT_RETRIES && isRateLimit(e)) {
          await sleep(computeRateLimitBackoffMs(e, attempt));
          continue;
        }
        this.token = undefined;
        throw e;
      }
    }
  }

  private buildAuthorizationHeader() {
    return { Authorization: `Bearer ${this.token!.value}` };
  }

  private isTokenValid(): boolean {
    if (!this.token
      || this.token.status !== TokenStatus.VALID
      || this.token.value.trim().length === 0) {
      return false;
    }
    // Proactive expiry check: if we could decode the JWT's `exp`, refresh ahead of time.
    // This avoids the round-trip-and-retry pattern at every expiry boundary
    if (this.token.exp !== undefined) {
      const nowSec = Math.floor(Date.now() / 1000);
      return this.token.exp > nowSec + EXPIRY_SAFETY_MARGIN_SEC; // 60s safety margin
    }
    return true;
  }

  public load(): PluginRunner<RequestOptions, RequestOptions> {
    return {
      transform: new AdditionalHeadersRequest({
        headers: this.getOAuth2Token(),
      }).load().transform,
    };
  }

  /**
   * Clear the cached token. If `failingJwt` is supplied, the cache is only
   * cleared when it still holds that exact JWT. This prevents a stale-JWT 401
   * retry from wiping a token that another caller already successfully refreshed.
   */
  public clearCachedToken(failingJwt?: string) {
    if (failingJwt !== undefined && this.token && this.token.value !== failingJwt) {
      return;
    }
    this.token = undefined;
  }
}

interface AccessToken {
  value: string;
  status: TokenStatus;
  exp?: number;
}

enum TokenStatus {
  INVALID,
  VALID,
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const isRateLimit = (error: unknown): error is RequestFailedError<unknown> =>
  error instanceof RequestFailedError && error.statusCode === 429;

/**
 * Backoff for a rate-limit retry. Honors `Retry-After` if the server sent one
 * (RFC 7231: delta-seconds or HTTP-date); otherwise full-jitter exponential.
 * Sinch prod doesn't send Retry-After today, so the exponential path is what
 * actually runs there — but the Retry-After path works for any third-party OAuth2
 * endpoint the SDK is pointed at.
 */
const computeRateLimitBackoffMs = (error: RequestFailedError<unknown>, attempt: number): number => {
  const fromHeader = parseRetryAfterMs(error.responseHeaders?.['retry-after']);
  if (fromHeader !== undefined) {
    // Add a sliver of jitter on top so concurrent SinchClient instances don't all
    // wake at the same millisecond and re-collide at the auth gateway.
    return fromHeader + Math.floor(Math.random() * 250);
  }
  const ceilingMs = RATE_LIMIT_RETRY_BASE_MS * Math.pow(RATE_LIMIT_RETRY_GROWTH, attempt);
  return Math.floor(Math.random() * ceilingMs);
};

const parseRetryAfterMs = (value: string | undefined): number | undefined => {
  if (!value) {
    return undefined;
  }
  const asNumber = Number(value);
  if (!Number.isNaN(asNumber) && asNumber >= 0) {
    return Math.floor(asNumber * 1000);
  }
  const asDate = Date.parse(value);
  if (!Number.isNaN(asDate)) {
    return Math.max(0, asDate - Date.now());
  }
  return undefined;
};

/**
 * Decode the `exp` claim from a JWT without verifying the signature.
 */
const decodeJwtExp = (jwt: string): number | undefined => {
  const parts = jwt.split('.');
  if (parts.length !== 3) {
    return undefined;
  }
  try {
    const decoded = Buffer.from(parts[1], 'base64url').toString('utf8');
    const payload = JSON.parse(decoded);
    return typeof payload.exp === 'number' ? payload.exp : undefined;
  } catch {
    return undefined;
  }
};
