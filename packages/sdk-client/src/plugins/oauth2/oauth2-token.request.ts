import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin, RequestPluginEnum } from '../core/request-plugin';
import { AdditionalHeadersRequest } from '../additional-headers';
import { ApiClient } from '../../api/api-client';
import { OAuth2Api } from './oauth2-api';
import { BasicAuthenticationRequest } from '../basicAuthentication';
import { ApiFetchClient } from '../../client/api-fetch-client';
import { AUTH_HOSTNAME } from '../../domain';

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
    // This prevents N concurrent requests from making N auth server calls,
    // which can cause 401 errors to surface to the SDK user.
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
    try {
      const response = await oauth2Api.postAccessToken();
      if (response.access_token) {
        this.token = {
          value: response.access_token,
          status: TokenStatus.VALID,
        };
        return this.buildAuthorizationHeader();
      } else {
        this.token = {
          value: '',
          status: TokenStatus.INVALID,
        };
        console.error('The authentication server did not return an access_token.'
          + ' Response keys: [' + Object.keys(response).join(', ') + ']');
        return {};
      }
    } catch (e) {
      this.token = {
        value: '',
        status: TokenStatus.INVALID,
      };
      console.error('An error occurred when trying to get the authentication token - ' + e);
      return {};
    }
  }


  private buildAuthorizationHeader() {
    return { Authorization: `Bearer ${this.token!.value}` };
  }

  private isTokenValid(): boolean | undefined {
    return (
      this.token
      && this.token.status === TokenStatus.VALID
      && this.token.value.trim().length > 0
    );
  }

  public load(): PluginRunner<RequestOptions, RequestOptions> {
    return {
      transform: new AdditionalHeadersRequest({
        headers: this.getOAuth2Token(),
      }).load().transform,
    };
  }

  public invalidateToken() {
    this.token = undefined;
  }
}

interface AccessToken {
  value: string;
  status: TokenStatus;
}

enum TokenStatus {
  INVALID,
  VALID,
}
