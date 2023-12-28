import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin, RequestPluginEnum } from '../core/request-plugin';

export class XTimestampRequest implements RequestPlugin {

  getName(): string {
    return RequestPluginEnum.X_TIMESTAMP_REQUEST;
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
