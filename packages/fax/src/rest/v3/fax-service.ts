import { SinchClientParameters } from '@sinch/sdk-client';
import { EmailsApi } from './emails';
import { FaxesApi } from './faxes';
import { ServicesApi } from './services';

export class FaxService {
  public readonly emails: EmailsApi;
  public readonly faxes: FaxesApi;
  public readonly services: ServicesApi;

  constructor(params: SinchClientParameters) {
    this.emails = new EmailsApi(params);
    this.faxes = new FaxesApi(params);
    this.services = new ServicesApi(params);
  }

  /**
   * Update the default basePath for each API
   *
   * @param {string} basePath - The new base path to use for all the APIs.
   */
  public setBasePath(basePath: string) {
    this.emails.setBasePath(basePath);
    this.faxes.setBasePath(basePath);
    this.services.setBasePath(basePath);
  }
}
