/**
 * Model: ScheduledVoiceProvisioning
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { ProvisioningStatus } from '../provisioning-status';

/**
 * Represents the ongoing or failed scheduled voice provisioning job. This field will be empty if the number was successfully provisioned provisioned for voice.
 */
export interface ScheduledVoiceProvisioning {
  /** Your app ID for the Voice API. The `appId` can be found in your <a href=\"https://dashboard.sinch.com/voice/apps\" target=\"_blank\">Sinch Customer Dashboard</a> under Voice, then apps. */
  appId?: string;
  /** @see ProvisioningStatus */
  status?: ProvisioningStatus;
  /** Timestamp when the status was last updated. */
  lastUpdatedTime?: string;
}
