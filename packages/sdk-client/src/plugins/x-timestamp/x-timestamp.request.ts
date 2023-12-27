import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin } from '../core/request-plugin';

export class XTimestampRequest implements RequestPlugin {

  getName(): string {
    return 'XTimestampRequest';
  }

  public load(): PluginRunner<RequestOptions, RequestOptions> {
    return {
      transform: (data: RequestOptions) => {
        data.headers.append('x-timestamp', new Date().toISOString());
        return data;
      },
    };
  }

}
