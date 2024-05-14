import { RentAnyNumberRequestSmsConfiguration } from '../rent-any-number-request-sms-configuration';
import { RentAnyNumberRequestVoiceConfiguration } from '../rent-any-number-request-voice-configuration';

/**
 * Request message for renting a phone number.
 */
export interface RentNumberRequest {
  /** @see RentAnyNumberRequestSmsConfiguration */
  smsConfiguration?: RentAnyNumberRequestSmsConfiguration;
  /** @see RentAnyNumberRequestVoiceConfiguration */
  voiceConfiguration?: RentAnyNumberRequestVoiceConfiguration;
  /** The callback URL to be called for a rented number provisioning / deprovisioning operations */
  callbackUrl?: string;
}
