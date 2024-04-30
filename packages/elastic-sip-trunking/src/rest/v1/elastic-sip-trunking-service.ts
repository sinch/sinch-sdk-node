import { SinchClientParameters } from '@sinch/sdk-client';
import { SipTrunksApi } from './sip-trunks';

export class ElasticSipTrunkingService {

  public readonly sipTrunks: SipTrunksApi;

  constructor(params: SinchClientParameters) {
    this.sipTrunks = new SipTrunksApi(params);
  }

  /**
   * Update the default hostname for each API
   *
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.sipTrunks.setHostname(hostname);
  }
}
