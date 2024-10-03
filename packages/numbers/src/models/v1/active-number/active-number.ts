import { Money } from '../money';
import { SMSConfigurationResponse } from '../sms-configuration';
import { VoiceConfigurationResponse } from '../voice-configuration';
import { CapabilitiesEnum, NumberTypeEnum } from '../enums';

/**
 * The phone number that has been rented by a customer and assigned to a project.
 */
export interface ActiveNumber {
  /** The phone number in <a href=\"https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\" target=\"_blank\">E.164</a> format with leading `+`. Example: `+12025550134`. */
  phoneNumber?: string;
  /** Project ID. Your project ID can be found on your <a href=\"https://dashboard.sinch.com/settings/project-management\" target=\"_blank\">Sinch Customer Dashboard</a>. */
  projectId?: string;
  /** User supplied name for the phone number. */
  displayName?: string;
  /** ISO 3166-1 alpha-2 country code of the phone number. Example `US`, `GB` or `SE`. */
  regionCode?: string;
  /** The number type. */
  type?: NumberTypeEnum;
  /** The capability of the number. */
  capability?: CapabilitiesEnum[];
  /** @see Money */
  money?: Money;
  /** How often the recurring price is charged in months. */
  paymentIntervalMonths?: number;
  /** The date of the next charge. */
  nextChargeDate?: Date | null;
  /** The timestamp when the subscription will expire if an expiration date has been set. */
  expireAt?: Date | null;
  /** @see SMSConfiguration */
  smsConfiguration?: SMSConfigurationResponse;
  /** @see VoiceConfiguration */
  voiceConfiguration?: VoiceConfigurationResponse;
  /** The active number\'s callback URL to be called for provisioning / deprovisioning updates */
  callbackUrl?: string;
}
