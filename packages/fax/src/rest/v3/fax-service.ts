import { FaxRegion, SinchClientParameters } from '@sinch/sdk-client';
import { EmailsApi } from './emails';
import { FaxesApi } from './faxes';
import { ServicesApi } from './services';

/**
 * The Fax Service exposes the following APIs:
 *  - services
 *  - faxes
 *  - emails
 */
export class FaxService {
  public readonly emails: EmailsApi;
  public readonly faxes: FaxesApi;
  public readonly services: ServicesApi;

  /**
   * Create a new FaxService instance with its configuration. It needs the following parameters for authentication:
   *  - `projectId`
   *  - `keyId`
   *  - `keySecret`
   *
   * Other supported properties:
   *  - `faxRegion`
   *  - `faxHostname`
   * @param {SinchClientParameters} params - an Object containing the necessary properties to initialize the service
   */
  constructor(params: SinchClientParameters) {
    this.emails = new EmailsApi(params);
    this.faxes = new FaxesApi(params);
    this.services = new ServicesApi(params);
  }

  /**
   * Update the default hostname for each API
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.emails.setHostname(hostname);
    this.faxes.setHostname(hostname);
    this.services.setHostname(hostname);
  }

  /**
   * Update the current region for each API
   * @param {FaxRegion} region - The new region to use in the production URL
   */
  public setRegion(region: FaxRegion) {
    this.emails.setRegion(region);
    this.faxes.setRegion(region);
    this.services.setRegion(region);
  }
}
