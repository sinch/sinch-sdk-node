/**
 * Model: RentAnyNumberRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { RentAnyNumberRequestSmsConfiguration } from '../rent-any-number-request-sms-configuration';
import { RentAnyNumberRequestVoiceConfiguration } from '../rent-any-number-request-voice-configuration';
import { SearchPattern } from '../search-pattern';
import { CapabilitiesEnum, NumberTypeEnum } from '../enums';

/**
 * Request message for searching and renting in one go any number that matches the search criteria.
 */
export interface RentAnyNumberRequest {
  /** @see SearchPattern */
  numberPattern?: SearchPattern;
  /** Region code to filter by. ISO 3166-1 alpha-2 country code of the phone number. Example: `US`, `GB` or `SE`. */
  regionCode: string;
  /** Number type to filter by. `MOBILE`, `LOCAL` or `TOLL_FREE`. */
  type: NumberTypeEnum;
  /** Number capabilities to filter by, `SMS` and/or `VOICE`. */
  capabilities?: CapabilitiesEnum[];
  /** @see RentAnyNumberRequestSmsConfiguration */
  smsConfiguration?: RentAnyNumberRequestSmsConfiguration;
  /** @see RentAnyNumberRequestVoiceConfiguration */
  voiceConfiguration?: RentAnyNumberRequestVoiceConfiguration;
  /** The active number's callback URL to be called for provisioning / deprovisioning updates */
  callbackUrl?: string;
}
