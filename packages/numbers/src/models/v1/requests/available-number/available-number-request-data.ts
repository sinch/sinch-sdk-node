import { CapabilitiesEnum, NumberTypeEnum, SearchPatternEnum } from '../../enums';
import { RentAnyNumberRequest } from '../../rent-any-number-request';
import { RentNumberRequest } from '../../rent-number-request';

export interface GetAvailableNumberRequestData {
  /** Output only. The phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format with leading `+`. */
  phoneNumber: string;
}
export interface ListAvailableNumbersRequestData {
  /** Region code to filter by. ISO 3166-1 alpha-2 country code of the phone number. Example: `US`, `GB` or `SE`. */
  regionCode: string;
  /** Number type to filter by. Options include, `MOBILE`, `LOCAL` or `TOLL_FREE`. */
  type: NumberTypeEnum;
  /** Sequence of digits to search for. If you prefer or need certain digits in sequential order, you can enter the sequence of numbers here. For example, `2020`. */
  'numberPattern.pattern'?: string;
  /** Search pattern to apply. The options are, `START`, `CONTAIN`, and `END`. */
  'numberPattern.searchPattern'?: SearchPatternEnum;
  /** Number capabilities to filter by SMS and/or VOICE. When searching, indicate the `capabilities` of the number as `SMS` and/or `VOICE`. To search for a number capable of both, list both `SMS` and `VOICE`. */
  capabilities?: Array<CapabilitiesEnum>;
  /** Optional. The maximum number of items to return. */
  size?: number;
}
export interface RentAnyNumberRequestData {
  /** The request to search and rent a number that matches the criteria. */
  rentAnyNumberRequestBody: RentAnyNumberRequest;
}
export interface RentNumberRequestData {
  /** Output only. The phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format with leading `+`. */
  phoneNumber: string;
  /** The request to rent a number. */
  rentNumberRequestBody: RentNumberRequest;
}
