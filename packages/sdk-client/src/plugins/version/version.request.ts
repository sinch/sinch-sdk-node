import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin, RequestPluginEnum } from '../core/request-plugin';
import * as process from 'process';
import { sdkCoreVersion } from '../../getVersion';

export class VersionRequest implements RequestPlugin {

  getName(): string {
    return RequestPluginEnum.VERSION_REQUEST;
  }
  public load(): PluginRunner<RequestOptions, RequestOptions> {
    const sdkVersion = sdkCoreVersion;
    const languageVersion = process.version;
    const implementationType = 'default';
    const auxiliaryFlag = 'none';
    return {
      transform: (data: RequestOptions) => {
        data.headers.append(
          'User-Agent',
          `sinch-sdk/${sdkVersion} (JavaScript/${languageVersion}; ${implementationType}; ${auxiliaryFlag})`,
        );
        return data;
      },
    };
  }
}
