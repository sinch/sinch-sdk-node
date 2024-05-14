import { ScheduledProvisioning } from '../scheduled-provisioning';

/**
 * The current SMS configuration for this number.   Once the `servicePlanId` is sent, it enters scheduled provisioning.   The status of scheduled provisioning will show under a `scheduledProvisioning` object if it\'s still running. Once processed successfully, the `servicePlanId` sent will appear directly under the `smsConfiguration` object.
 */
export interface SMSConfiguration {
  /** The `servicePlanId` can be found in the <a href=\"https://dashboard.sinch.com/sms/api/rest\" target=\"_blank\">Sinch Customer Dashboard</a>. The service plan ID is what ties this number to the configured SMS service. */
  servicePlanId: string;
  /** Only for US virtual numbers. This campaign ID relates to <a href=\"https://community.sinch.com/t5/10DLC/What-is-10DLC/ta-p/7845\" target=\"_blank\">10DLC numbers</a>. So, it is the current campaign ID for this number. The `campaignId` is found on your TCR platform. */
  campaignId?: string;
  /** @see ScheduledProvisioning */
  scheduledProvisioning?: ScheduledProvisioning | null;
}
