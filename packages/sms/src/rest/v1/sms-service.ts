import {
  SinchClientParameters, SmsRegion,
} from '@sinch/sdk-client';
import { GroupsApi } from './groups';
import { DeliveryReportsApi } from './delivery-reports';
import { BatchesApi } from './batches';
import { InboundsApi } from './inbounds';

/**
 * The SMS Service exposes the following APIs:
 *  - groups
 *  - batches
 *  - inbounds
 *  - deliveryReports
 */
export class SmsService {
  public readonly groups: GroupsApi;
  public readonly deliveryReports: DeliveryReportsApi;
  public readonly batches: BatchesApi;
  public readonly inbounds: InboundsApi;

  /**
   * Create a new SmsService instance with its configuration. This service can be instantiated with 2 different authentication mechanisms:
   * - OAuth2: the required properties are `projectId`, `keyId` and `keySecret`
   * - API Token: the required properties are `servicePlanId` and `apiToken`
   *
   * Other supported properties:
   *  - `smsRegion`
   *  - `smsHostname`
   *  - `forceOAuth2ForSmsApi`
   *  - `forceServicePlanIdUsageForSmsApi`
   * @param {SinchClientParameters} params - an Object containing the necessary properties to initialize the service
   */
  constructor(params: SinchClientParameters) {
    this.groups = new GroupsApi(params);
    this.deliveryReports = new DeliveryReportsApi(params);
    this.batches = new BatchesApi(params);
    this.inbounds = new InboundsApi(params);
  }

  /**
   * Update the default hostname for each API
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.groups.setHostname(hostname);
    this.deliveryReports.setHostname(hostname);
    this.batches.setHostname(hostname);
    this.inbounds.setHostname(hostname);
  }

  /**
   * Update the current region for each API
   * @param {SmsRegion} region - The new region to use in the production URL
   */
  public setRegion(region: SmsRegion) {
    this.groups.setRegion(region);
    this.deliveryReports.setRegion(region);
    this.batches.setRegion(region);
    this.inbounds.setRegion(region);
  }
}
