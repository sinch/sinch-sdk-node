import { ScheduledVoiceProvisioning } from '../scheduled-voice-provisioning';

/**
 * The current voice configuration for this number. During scheduled provisioning, the app ID value may be empty in a response if it is still processing or if it has failed. The status of scheduled provisioning will show under a `scheduledVoiceProvisioning` object if it\'s still running. Once processed successfully, the `appId` sent will appear directly under the `voiceConfiguration` object.
 */
export interface VoiceConfiguration {
  /** Your app ID for the Voice API. The `appId` can be found in your <a href="https://dashboard.sinch.com/voice/apps" target="_blank">Sinch Customer Dashboard</a> under Voice, then apps. */
  appId?: string;
  /** Timestamp when the status was last updated. */
  lastUpdatedTime?: Date | null;
  /** @see ScheduledVoiceProvisioning */
  scheduledVoiceProvisioning?: ScheduledVoiceProvisioning | null;
  /** Type of product the number is associated to. Default is `RTC`. */
  type?: 'RTC' | 'EST' | 'FAX' | string;
  /** Reference to the SIP Trunk ID created with the <a href="https://developers.sinch.com/docs/est/api-reference/sip-trunking/#tag/SIP-Trunks" target="_blank">Elastic SIP Trunking API</a>. Not empty when the type is set to `EST`. */
  trunkId?: string;
  /** Reference to the Service ID created with the <a href="https://developers.sinch.com/docs/fax/api-reference/fax/tag/Services/" target="_blank">Fax API</a>. Not empty when the type is set to `FAX`. */
  serviceId?: string;
}
