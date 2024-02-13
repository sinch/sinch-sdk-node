/**
 * This object is required for channels which use a static token credential for authentication.
 */
export interface StaticTokenCredential {

  /** The static token for the channel. */
  token: string;
}
