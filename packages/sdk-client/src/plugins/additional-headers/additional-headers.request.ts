import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin, RequestPluginEnum } from '../core/request-plugin';

export interface AdditionalHeaders {
  headers: Promise<{ [key: string]: string }>;
}

/**
 * Builds a Promise containing the new header in the form of an object {key : value}
 * @param {string} key - the header key
 * @param {string} value - the header value
 */
export const buildHeader = async (key: string, value: string): Promise<{[key: string]: string}> => (
  { [key] : value }
);

export class AdditionalHeadersRequest implements RequestPlugin {
  private readonly additionalHeaders: AdditionalHeaders;

  constructor(additionalHeaders: AdditionalHeaders) {
    this.additionalHeaders = additionalHeaders;
  }

  getName(): string {
    return RequestPluginEnum.ADDITIONAL_HEADER_REQUEST;
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
