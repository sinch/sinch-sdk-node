import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin } from '../core/request-plugin';

export interface AdditionalHeaders {
  headers: Promise<{ [key: string]: string }>;
}

export class AdditionalHeadersRequest implements RequestPlugin {
  private readonly additionalHeaders: AdditionalHeaders;

  constructor(additionalHeaders: AdditionalHeaders) {
    this.additionalHeaders = additionalHeaders;
  }

  getName(): string {
    return 'AdditionalHeadersRequest';
  }

  public load(): PluginRunner<RequestOptions, RequestOptions> {
    return {
      transform: async (data: RequestOptions) => {
        const headers = await this.additionalHeaders.headers;
        if (headers) {
          Object.keys(headers).forEach((key) =>
            data.headers.set(key, headers[key]),
          );
        }
        return data;
      },
    };
  }
}
