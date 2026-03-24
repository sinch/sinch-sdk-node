
import { ErrorResponse } from '../error-response';
import { LineType } from '../enums';

export interface LineResponse {
  /** Name of the carrier. */
  carrier?: string;
  /** Number type e.g. wireless, mobile, fixed. */
  type?: LineType;
  /** A numeric code (MCC) that uniquely identifies a country within the international telecommunications network. */
  mobileCountryCode?: string;
  /** A distinct identifier assigned to a mobile network operator within a specific country, used in combination with MCC. */
  mobileNetworkCode?: string;
  /** Indicates if a phone number has been transferred from its original network to a different provider. */
  ported?: boolean;
  /** Specifies the date, in ISO 8601 format, when a phone number was transferred from its original network to a new provider. */
  portingDate?: Date;
  /** @see ErrorResponse */
  error?: ErrorResponse;
}
