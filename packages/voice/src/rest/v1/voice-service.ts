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
   * Update the default basePath for each API
   *
   * @param {string} basePath - The new base path to use for all the APIs.
   */
  public setBasePath(basePath: string) {
    this.applications.setBasePath(basePath);
    this.conferences.setBasePath(basePath);
    this.calls.setBasePath(basePath);
    this.callouts.setBasePath(basePath);
  }

  public setRegion(region: VoiceRegion) {
    this.applications.setRegion(region);
  }
}
