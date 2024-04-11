import { SinchClientParameters, VoiceRegion } from '@sinch/sdk-client';
import { ApplicationsApi } from './applications';
import { ConferencesApi } from './conferences';
import { CallsApi } from './calls';
import { CalloutsApi } from './callouts';

/**
 * The Voice Service exposes the following APIs:
 * - applications
 * - callouts
 * - conferences
 * - calls
 */
export class VoiceService {
  public readonly applications: ApplicationsApi;
  public readonly conferences: ConferencesApi;
  public readonly calls: CallsApi;
  public readonly callouts: CalloutsApi;

  /**
   * Create a new VoiceService instance with its configuration. It needs the following parameters for authentication:
   * - `applicationKey`
   * - `applicationSecret`
   *
   * Other supported properties:
   * - `voiceRegion`
   * - `voiceHostname`
   * - `voiceApplicationManagementHostname`
   * @param {SinchClientParameters} params - an Object containing the necessary properties to initialize the service
   */
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
  public setApplicationsManagementHostname(hostname: string) {
    this.applications.setHostname(hostname);
  }

  /**
   * Update the current region for each API
   * @param {VoiceRegion} region - The new region to use in the production URL
   */
  public setRegion(region: VoiceRegion) {
    this.conferences.setRegion(region);
    this.calls.setRegion(region);
    this.callouts.setRegion(region);
  }
}
