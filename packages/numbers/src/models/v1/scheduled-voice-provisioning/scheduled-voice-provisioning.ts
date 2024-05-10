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
  /** Type of product the number is associated to. Default is `RTC`. */
  type?: 'RTC' | 'EST' | 'FAX' | string;
  /** Reference to the SIP Trunk ID created with the <a href="https://developers.sinch.com/docs/est/api-reference/sip-trunking/#tag/SIP-Trunks" target="_blank">Elastic SIP Trunking API</a>. Not empty when the type is set to `EST`. */
  trunkId?: string;
  /** Reference to the Service ID created with the <a href="https://developers.sinch.com/docs/fax/api-reference/fax/tag/Services/" target="_blank">Fax API</a>. Not empty when the type is set to `FAX`. */
  serviceId?: string;
}
