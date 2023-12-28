import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin, RequestPluginEnum } from '../core/request-plugin';

export class ApiTokenRequest implements RequestPlugin {
  private readonly apiToken: string;

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  getName(): string {
    return RequestPluginEnum.API_TOKEN_REQUEST;
  }

  public load(): PluginRunner<RequestOptions, RequestOptions> {
    return {
      transform: (data: RequestOptions) => {
        data.headers.append('Authorization', `Bearer ${this.apiToken}`);
        return data;
      },
    };
  }
}
