import { VoicePrice } from '../voice-price';

export interface QueryNumberResponse {

  /** The type of method. */
  method?: string;
  /** The number details object. */
  number?: NumberDetails;
}

export interface NumberDetails {

  /** The ISO 3166-1 formatted country code. */
  countryId?: string;
  /** The type of the number. */
  numberType?: 'Unknown' | 'Fixed' | 'Mobile' | 'Other';
  /** The number in E.164 format. */
  normalizedNumber?: string;
  /** Concerns whether the call is restricted or not. */
  restricted?: boolean;
  /** The cost per minute to call the destination number. */
  rate?: VoicePrice;
}
