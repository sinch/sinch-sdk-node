import { Api, ApiClient } from '../../api';

export interface Response {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export class OAuth2Api implements Api {
  /** @inheritDoc */
  public readonly apiName = 'OAuth2Api';

  /** @inheritDoc */
  public readonly client: ApiClient;

  constructor(apiClient: ApiClient) {
    this.client = apiClient;
  }

  public async postAccessToken(): Promise<Response> {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = `${encodeURIComponent('grant_type')}=${encodeURIComponent(
      'client_credentials',
    )}`;
    const url = `${this.client.apiClientOptions.hostname}/oauth2/token`;
    const requestOptions = await this.client.prepareOptions(
      url,
      'POST',
      {},
      headers,
      body,
    );
    return this.client.processCall<Response>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'OAuth2Token',
    });
  }
}
