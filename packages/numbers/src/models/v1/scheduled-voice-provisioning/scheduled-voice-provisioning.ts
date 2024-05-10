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
  lastUpdatedTime?: Date;
  /** The type of voice configuration. Default is `RTC`. */
  type: 'RTC' | 'EST' | 'FAX' | string;
  /** The trunk ID for the EST voice configuration. The `trunkId` can be found in your <a href="https://dashboard.sinch.com/sip/trunks" target="_blank">Sinch Customer Dashboard</a> under sip, then trunks.*/
  trunkId?: string;
  /** The service ID for the FAX configuration. The `serviceId` can be found in your <a href="https://dashboard.sinch.com/fax/services" target="_blank">Sinch Customer Dashboard</a> under fax, then services.*/
  serviceId?: string;
}
