import { CapabilitiesEnum, NumberTypeEnum, OrderByEnum, SearchPatternEnum } from '../../enums';
import { ActiveNumberRequest } from '../../active-number-request';
import { EmergencyAddressRequest } from '../../emergency-address-request';

export interface GetActiveNumberRequestData {
  /** The phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format with leading `+`. */
  phoneNumber: string;
}

export interface ListActiveNumbersRequestData {
  /** Region code to filter by. ISO 3166-1 alpha-2 country code of the phone number. Example: `US`, `GB` or `SE`. */
  regionCode?: string;
  /** Number type to filter by. Options include, `MOBILE`, `LOCAL` or `TOLL_FREE`. */
  type?: NumberTypeEnum;
  /** Sequence of digits to search for. If you prefer or need certain digits in sequential order, you can enter the sequence of numbers here. For example, `2020`. */
  'numberPattern.pattern'?: string;
  /** Search pattern to apply. The options are, `START`, `CONTAIN`, and `END`. */
  'numberPattern.searchPattern'?: SearchPatternEnum;
  /** Number capabilities to filter by, `SMS` or `VOICE`. */
  capability?: CapabilitiesEnum;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next page token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Supported fields for ordering by `phoneNumber` or `displayName`. */
  orderBy?: OrderByEnum;
}

export interface ReleaseNumberRequestData {
  /** The phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format with leading `+`. */
  phoneNumber: string;
}

export interface UpdateActiveNumberRequestData {
  /** The phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format with leading `+`. */
  phoneNumber: string;
  /** The number body to be updated. */
  updateActiveNumberRequestBody?: ActiveNumberRequest;
}

export interface DeprovisionEmergencyAddressRequestData {
  /** The phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format with leading `+`. */
  phoneNumber: string;
}

export interface GetEmergencyAddressRequestData {
  /** The phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format with leading `+`. */
  phoneNumber: string;
}

export interface ProvisionEmergencyAddressRequestData {
  /** The phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format with leading `+`. */
  phoneNumber: string;
  /** Request to provision an emergency address for a number. */
  emergencyAddressRequestBody?: EmergencyAddressRequest;
}

export interface ValidateEmergencyAddressRequestData {
  /** The phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format with leading `+`. */
  phoneNumber?: string;
  /** Request to validate an emergency address for a number. */
  emergencyAddressRequestBody?: EmergencyAddressRequest;
}
