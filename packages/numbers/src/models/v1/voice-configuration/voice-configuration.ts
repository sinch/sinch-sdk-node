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
  /** The type of voice configuration. Default is `RTC`. */
  type: 'RTC' | 'EST' | 'FAX' | string;
  /** The trunk ID for the EST voice configuration. The `trunkId` can be found in your <a href="https://dashboard.sinch.com/sip/trunks" target="_blank">Sinch Customer Dashboard</a> under sip, then trunks.*/
  trunkId?: string;
  /** The service ID for the FAX configuration. The `serviceId` can be found in your <a href="https://dashboard.sinch.com/fax/services" target="_blank">Sinch Customer Dashboard</a> under fax, then services.*/
  serviceId?: string;
}
