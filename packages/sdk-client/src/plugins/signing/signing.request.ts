import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin, RequestPluginEnum } from '../core/request-plugin';
import { generateAuthorizationHeader } from '../../utils/authorization.helper';

export class SigningRequest implements RequestPlugin {
  private readonly applicationId: string;
  private readonly applicationSecret: string;

  constructor(applicationId: string, applicationSecret: string) {
    this.applicationId = applicationId;
    this.applicationSecret = applicationSecret;
  }

  getName(): string {
    return RequestPluginEnum.SIGNING_REQUEST;
  }

  public load(): PluginRunner<RequestOptions, RequestOptions> {
    return {
      transform: (data: RequestOptions) => {
        if (!data.method) {
          throw new Error('The HTTP method must be defined.');
        }
        if (!data.path) {
          throw new Error('The URL path must be defined.');
        }
        const authorizationHeader = generateAuthorizationHeader(
          data.method.toUpperCase(),
          data.body,
          data.headers.get('Content-Type')!,
          `x-timestamp:${data.headers.get('x-timestamp')}`,
          data.path,
          this.applicationId,
          this.applicationSecret,
        );
        data.headers.append('Authorization', authorizationHeader);
        return data;
      },
    };
  }
}
