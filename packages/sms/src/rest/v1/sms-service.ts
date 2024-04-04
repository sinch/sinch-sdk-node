import {
  SinchClientParameters,
} from '@sinch/sdk-client';
import { GroupsApi } from './groups';
import { DeliveryReportsApi } from './delivery-reports';
import { BatchesApi } from './batches';
import { InboundsApi } from './inbounds';

export class SmsService {
  public readonly groups: GroupsApi;
  public readonly deliveryReports: DeliveryReportsApi;
  public readonly batches: BatchesApi;
  public readonly inbounds: InboundsApi;

  constructor(params: SinchClientParameters) {
    this.groups = new GroupsApi(params);
    this.deliveryReports = new DeliveryReportsApi(params);
    this.batches = new BatchesApi(params);
    this.inbounds = new InboundsApi(params);
  }

  /**
   * Update the default hostname for each API
   *
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.groups.setHostname(hostname);
    this.deliveryReports.setHostname(hostname);
    this.batches.setHostname(hostname);
    this.inbounds.setHostname(hostname);
  }
}
