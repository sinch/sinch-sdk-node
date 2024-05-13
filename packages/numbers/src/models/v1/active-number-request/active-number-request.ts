import { SMSConfiguration } from '../sms-configuration';
import { VoiceConfiguration } from '../voice-configuration';

/**
 * The phone number that has been rented by a customer and assigned to a project.
 */
export interface ActiveNumberRequest {
  /** User supplied name for the phone number. */
  displayName?: string;
  /** @see SMSConfiguration */
  smsConfiguration?: SMSConfiguration;
  /** @see VoiceConfiguration */
  voiceConfiguration?: VoiceConfiguration;
  /** The active number's callback URL to be called for provisioning / deprovisioning updates */
  callbackUrl?: string;
}
