/**
 * This object is required for channels which use a bearer-type of credential for authentication.
 */
export interface StaticBearerCredential {

  /** The claimed identity for the channel. */
  claimed_identity: string;
  /** The static bearer token for the channel. */
  token: string;
}
