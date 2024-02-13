/**
 * If you are including the LINE channel in the `channel_identifier` property, you must include this object.
 */
export interface LineCredentials {

  /** The token for the LINE channel to which you are connecting. */
  token: string;
  /** The secret for the LINE channel to which you are connecting. */
  secret: string;
}
