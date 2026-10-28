import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin, RequestPluginEnum } from '../core/request-plugin';
import * as process from 'process';
import { sdkCoreVersion } from '../../getVersion';

/** @internal */
export class VersionRequest implements RequestPlugin {

  /**
   * @param {string} implementationType - Identifies the SDK flavour in the User-Agent (e.g. `default`, `http`)
   */
  constructor(private readonly implementationType = 'default') {}

  getName(): string {
    return RequestPluginEnum.VERSION_REQUEST;
  }
  public load(): PluginRunner<RequestOptions, RequestOptions> {
    const sdkVersion = sdkCoreVersion;
    const languageVersion = process.version;
    const implementationType = this.implementationType;
    const auxiliaryFlag = 'none';
    return {
      transform: (data: RequestOptions) => {
        data.headers.set(
          'User-Agent',
          `sinch-sdk/${sdkVersion} (JavaScript/${languageVersion}; ${implementationType}; ${auxiliaryFlag})`,
        );
        return data;
      },
    };
  }
}
