import {
  Api,
  ApiClient,
  ApiFetchClient,
  SinchClientParameters,
  buildMailgunApiClientOptions,
  MAILGUN_HOSTNAME,
  formatRegionalizedHostname,
  MailgunRegion,
  SupportedMailgunRegion,
  MailgunCredentials,
} from '@sinch/sdk-client';

export class MailgunDomainApi implements Api {
  public readonly apiName: string;
  public client?: ApiClient;
  private sinchClientParameters: SinchClientParameters;

  constructor(sinchClientParameters: SinchClientParameters, apiName: string) {
    this.sinchClientParameters = sinchClientParameters;
    this.apiName = apiName;
  }

  /**
   * Update the default hostname for the API
   * @param {string} hostname - The new hostname to use for the APIs.
   */
  public setHostname(hostname: string) {
    try {
      this.client = this.getSinchClient();
      this.client.apiClientOptions.hostname = hostname;
    } catch (error) {
      console.error('Impossible to set a new hostname, the credentials need to be provided first.');
      throw error;
    }
  }

  /**
   * Update the region in the hostname
   * @param {MailgunRegion} region - The new region to send the requests to
   */
  public setRegion(region: MailgunRegion) {
    this.sinchClientParameters.mailgunRegion = region;
    if (this.client) {
      this.client.apiClientOptions.hostname = this.buildHostname(region);
    }
  }

  /**
   * Updates the credentials used to authenticate API requests
   * @param {MailgunCredentials} credentials
   */
  public setCredentials(credentials: MailgunCredentials) {
    const parametersBackup = { ...this.sinchClientParameters };
    this.sinchClientParameters = {
      ...parametersBackup,
      ...credentials,
    };
    this.resetApiClient();
    try {
      this.getSinchClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the Mailgun API');
      this.sinchClientParameters = parametersBackup;
      throw error;
    }
  }

  private resetApiClient() {
    this.client = undefined;
  }

  /**
   * Checks the configuration parameters are ok and initialize the API client. Once initialized, the same instance will
   * be returned for the subsequent API calls (singleton pattern)
   * @return {ApiClient} the API Client or throws an error in case the configuration parameters are not ok
   * @private
   */
  public getSinchClient(): ApiClient {
    if (!this.client) {
      const region = this.sinchClientParameters.mailgunRegion ?? MailgunRegion.DEFAULT;
      if(!Object.values(SupportedMailgunRegion).includes(region as SupportedMailgunRegion)) {
        console.warn(`The region "${region}" is not known as a supported region for the Mailgun API`);
      }
      const apiClientOptions = buildMailgunApiClientOptions(this.sinchClientParameters);
      this.client = new ApiFetchClient(apiClientOptions);
      this.client.apiClientOptions.hostname = this.buildHostname(region);
    }
    return this.client;
  }

  private buildHostname(region: MailgunRegion) {
    const formattedRegion = region !== '' ? `${region}.` : '';
    return this.sinchClientParameters.mailgunHostname
      ?? formatRegionalizedHostname(MAILGUN_HOSTNAME, formattedRegion);
  }
}
