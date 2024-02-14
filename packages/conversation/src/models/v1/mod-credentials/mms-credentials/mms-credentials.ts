import { BasicAuthCredential } from '../basic-auth-credential';

/**
 * If you are including the MMS channel in the `channel_identifier` property, you must include this object.
 */
export interface MMSCredentials {

  /** MMS Account ID. */
  account_id: string;
  /** MMS API Key. */
  api_key: string;
  /** @see BasicAuthCredential */
  basic_auth: BasicAuthCredential;
  /** Default Sender (shortcode or longnumber), will be used when {{YOUR_MMS_SENDER}} in a message is empty */
  default_sender?: string;
}
