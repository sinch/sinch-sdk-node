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
   * Update the default hostname for each API
   *
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.emails.setHostname(hostname);
    this.faxes.setHostname(hostname);
    this.services.setHostname(hostname);
  }
}
