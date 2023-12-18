/**
 * Model: ScheduledProvisioning
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { ProvisioningStatus } from '../provisioning-status';
import { SmsErrorCode } from '../sms-error-code';

/**
 * Represents the ongoing or failed scheduled provisioning job. This field will be empty if both the was successfully provisioned into the SMS platform and linked to the 10DLC campaign.
 */
export interface ScheduledProvisioning {
  /** The SMS service plan that the scheduled provisioning job will configured with the number. */
  servicePlanId?: string;
  /** TCR campaign ID that the scheduled provisioning job will configure with the number. */
  campaignId?: string;
  /** @see ProvisioningStatus */
  status?: ProvisioningStatus;
  /** Timestamp when the status was last updated. */
  lastUpdatedTime?: Date;
  /** List of SmsErrorCodes */
  errorCodes?: SmsErrorCode[];
}
