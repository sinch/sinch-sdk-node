import { SinchClientParameters } from '@sinch/sdk-client';
import { EmailsApi } from './emails';

export class MailgunService {
  public readonly emails: EmailsApi;

  constructor(params: SinchClientParameters) {
    this.emails = new EmailsApi(params);
  }

  /**
   * Update the default hostname for each API
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.emails.setHostname(hostname);
  }

  /**
   * Update the default hostname to purge the emails queues
   * @param {string} storageHostnames - The new hostnames for the emails storage.
   */
  public setStorageHostnames(storageHostnames: string[]) {
    this.emails.setStorageHostnames(storageHostnames);
  }
}
