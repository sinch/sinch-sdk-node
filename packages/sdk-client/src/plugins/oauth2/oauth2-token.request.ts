import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin, RequestPluginEnum } from '../core/request-plugin';
import { AdditionalHeadersRequest } from '../additional-headers';
import { ApiClient } from '../../api';
import { OAuth2Api } from './oauth2-api';
import { BasicAuthenticationRequest } from '../basicAuthentication';
import { ApiFetchClient } from '../../client';

export class Oauth2TokenRequest implements RequestPlugin {
  private readonly apiClient: ApiClient;

  private token: AccessToken | undefined;

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
      authenticationUrl = 'https://auth.sinch.com';
    }
    this.apiClient = new ApiFetchClient({
      basePath: authenticationUrl,
      requestPlugins: [basicAuthenticationPlugin],
    });
  }

  private async getOAuth2Token(): Promise<{ [key: string]: string }> {
    if (this.isTokenValid()) {
      return this.buildAuthorizationHeader();
    }
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
        console.error('No access_token has been returned. Response = ' + JSON.stringify(response));
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
