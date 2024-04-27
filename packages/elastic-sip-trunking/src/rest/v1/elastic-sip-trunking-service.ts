import { SinchClientParameters } from '@sinch/sdk-client';
import { SipTrunksApi } from './sip-trunks';
import { AccessControlListApi } from './access-control-list';
import { SipEndpointsApi } from './sip-endpoints';
import { CountryPermissionsApi } from './country-permissions';

export class ElasticSipTrunkingService {

  public readonly sipTrunks: SipTrunksApi;
  public readonly sipEndpoints: SipEndpointsApi;
  public readonly accessControlList: AccessControlListApi;
  public readonly countryPermissions: CountryPermissionsApi;

  constructor(params: SinchClientParameters) {
    this.sipTrunks = new SipTrunksApi(params);
    this.sipEndpoints = new SipEndpointsApi(params);
    this.accessControlList = new AccessControlListApi(params);
    this.countryPermissions = new CountryPermissionsApi(params);
  }

  /**
   * Update the default hostname for each API
   *
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.sipTrunks.setHostname(hostname);
    this.sipEndpoints.setHostname(hostname);
    this.accessControlList.setHostname(hostname);
    this.countryPermissions.setHostname(hostname);
  }
}
