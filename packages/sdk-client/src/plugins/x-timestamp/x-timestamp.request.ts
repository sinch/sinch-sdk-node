import { PluginRunner, RequestOptions, RequestPlugin } from '../core';

export class XTimestampRequest implements RequestPlugin {

  public load(): PluginRunner<RequestOptions, RequestOptions> {
    return {
      transform: (data: RequestOptions) => {
        data.headers.append('x-timestamp', new Date().toISOString());
        return data;
      },
    };
  }

}
