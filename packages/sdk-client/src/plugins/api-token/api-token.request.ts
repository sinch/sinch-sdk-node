import { PluginRunner, RequestOptions, RequestPlugin } from '../core';

export class ApiTokenRequest implements RequestPlugin {
  private readonly apiToken: string;

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  getName(): string {
    return 'ApiTokenRequest';
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
