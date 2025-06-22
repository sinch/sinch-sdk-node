import { SMSConfiguration } from '../sms-configuration';
import { VoiceConfiguration } from '../voice-configuration';

/**
 * Request message for renting a phone number.
 */
export interface RentNumberRequest {
  /** @see SMSConfiguration */
  smsConfiguration?: SMSConfiguration;
  /** @see VoiceConfiguration */
  voiceConfiguration?: VoiceConfiguration;
  /** The callback URL to be called for a rented number provisioning / deprovisioning operations */
  callbackUrl?: string;
}
