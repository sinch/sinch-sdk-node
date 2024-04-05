import { SinchClientParameters, VoiceRegion } from '@sinch/sdk-client';
import { ApplicationsApi } from './applications';
import { ConferencesApi } from './conferences';
import { CallsApi } from './calls';
import { CalloutsApi } from './callouts';

export class VoiceService {
  public readonly applications: ApplicationsApi;
  public readonly conferences: ConferencesApi;
  public readonly calls: CallsApi;
  public readonly callouts: CalloutsApi;

  constructor(params: SinchClientParameters) {
    this.applications = new ApplicationsApi(params);
    this.conferences = new ConferencesApi(params);
    this.calls = new CallsApi(params);
    this.callouts = new CalloutsApi(params);
  }

  /**
   * Update the default hostname for each API except Applications
   * @param {string} hostname - The new hostname to use for all the APIs except Applications.
   */
  public setHostname(hostname: string) {
    this.conferences.setHostname(hostname);
    this.calls.setHostname(hostname);
    this.callouts.setHostname(hostname);
  }

  /**
   * Update the default hostname for the Applications API
   * @param {string} hostname - The new hostname to use for the Applications API.
   */
  public setApplicationManagementHostname(hostname: string) {
    this.applications.setHostname(hostname);
  }

  public setRegion(region: VoiceRegion) {
    this.applications.setRegion(region);
  }
}
