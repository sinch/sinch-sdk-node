import { PluginRunner, RequestOptions, RequestPlugin } from '../core';

export class BasicAuthenticationRequest implements RequestPlugin {
  private readonly userName: string;
  private readonly password: string;

  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
  }

  public load(): PluginRunner<RequestOptions, RequestOptions> {
    return {
      transform: (data: RequestOptions) => {
        const basicAuth
          = 'Basic '
          + Buffer.from(`${this.userName}:${this.password}`).toString('base64');
        data.headers.append('Authorization', basicAuth);
        return data;
      },
    };
  }
}
