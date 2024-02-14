/**
 * If you are including the Instagram channel in the `channel_identifier` property, you must include this object.
 */
export interface InstagramCredentials {

  /** The Token for the Instagram channel to which you are connecting. */
  token: string;
  /** Required if using the Sinch Facebook App. */
  business_account_id?: string;
}
