import { ApiMoMessage } from '../api-mo-message';

export interface MOBinary extends ApiMoMessage {

  /** The message content Base64 encoded.   Max 140 bytes together with udh.  */
  body: string;
  /** SMS in binary format */
  type: 'mo_binary';
  /** The UDH header of a binary message HEX encoded. Max 140 bytes together with body. */
  udh: string;
}
