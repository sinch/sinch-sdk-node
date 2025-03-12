import { ApiMoMessage } from '../api-mo-message';

export interface MOBinary extends ApiMoMessage {
  /** The message content Base64 encoded.   Max 140 bytes together with udh.  */
  body: string;
  /** SMS in [binary](https://community.sinch.com/t5/Glossary/Binary-SMS/ta-p/7470) format */
  type: 'mo_binary';
  /** The UDH header of a binary message HEX encoded. Max 140 bytes together with body. */
  udh: string;
}
