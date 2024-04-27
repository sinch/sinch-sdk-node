import { SinchClientParameters } from '@sinch/sdk-client';
import { SipTrunksApi } from './sip-trunks';
import { AccessControlListApi } from './access-control-list';
import { SipEndpointsApi } from './sip-endpoints';
import { CountryPermissionsApi } from './country-permissions';
import { PhoneNumbersApi } from './phone-numbers';
import { CallsHistoryApi } from './calls-history';

export class ElasticSipTrunkingService {

  public readonly sipTrunks: SipTrunksApi;
  public readonly sipEndpoints: SipEndpointsApi;
  public readonly accessControlList: AccessControlListApi;
  public readonly countryPermissions: CountryPermissionsApi;
  public readonly phoneNumbers: PhoneNumbersApi;
  public readonly calls: CallsHistoryApi;

  constructor(params: SinchClientParameters) {
    this.sipTrunks = new SipTrunksApi(params);
    this.sipEndpoints = new SipEndpointsApi(params);
    this.accessControlList = new AccessControlListApi(params);
    this.countryPermissions = new CountryPermissionsApi(params);
    this.phoneNumbers = new PhoneNumbersApi(params);
    this.calls = new CallsHistoryApi(params);
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
    this.phoneNumbers.setHostname(hostname);
    this.calls.setHostname(hostname);
  }
}
