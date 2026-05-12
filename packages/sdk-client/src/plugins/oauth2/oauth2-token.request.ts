import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin, RequestPluginEnum } from '../core/request-plugin';
import { AdditionalHeadersRequest } from '../additional-headers';
import { ApiClient } from '../../api/api-client';
import { OAuth2Api } from './oauth2-api';
import { BasicAuthenticationRequest } from '../basicAuthentication';
import { ApiFetchClient } from '../../client/api-fetch-client';
import { AUTH_HOSTNAME } from '../../domain';

const EXPIRY_SAFETY_MARGIN_SEC = 60;

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
    let response;
    try {
      response = await oauth2Api.postAccessToken();
    } catch (e) {
      // Propagate the auth failure to the caller.
      this.token = undefined;
      throw e;
    }
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
