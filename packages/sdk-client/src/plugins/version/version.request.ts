import { PluginRunner, RequestOptions, RequestPlugin } from '../core';
import * as process from 'process';
// import version from '../../getVersion';
import { sdkCoreVersion } from '../../getVersion';

export class VersionRequest implements RequestPlugin {

  getName(): string {
    return 'VersionRequest';
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
