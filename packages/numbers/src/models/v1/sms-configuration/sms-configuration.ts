import { ScheduledProvisioning } from '../scheduled-provisioning';

/**
 * The current SMS configuration for this number.   Once the `servicePlanId` is sent, it enters scheduled provisioning.   The status of scheduled provisioning will show under a `scheduledProvisioning` object if it\'s still running. Once processed successfully, the `servicePlanId` sent will appear directly under the `smsConfiguration` object.
 */
export interface SMSConfiguration {
  /** The `servicePlanId` can be found in the [Sinch Customer Dashboard](https://dashboard.sinch.com/sms/api/rest). The service plan ID is what ties this number to the configured SMS service. */
  servicePlanId: string;
  /** Only for US virtual numbers. This campaign ID relates to [10DLC numbers](https://community.sinch.com/t5/10DLC/What-is-10DLC/ta-p/7845). So, it is the current campaign ID for this number. The `campaignId` is found on your TCR platform. */
  campaignId?: string;
}

export interface SMSConfigurationResponse extends SMSConfiguration {
  /** @see ScheduledProvisioning */
  scheduledProvisioning?: ScheduledProvisioning | null;
}
