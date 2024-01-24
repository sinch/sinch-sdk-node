/**
 * Optional. Used for OAuth2 authentication.
 */
export interface ClientCredentials {

  /** The Client ID that will be used in the OAuth2 Client Credentials flow. */
  client_id: string;
  /** The Client Secret that will be used in the OAuth2 Client Credentials flow. */
  client_secret: string;
  /** The endpoint that will be used in the OAuth2 Client Credentials flow. Expected to return a JSON with an access token and `expires_in` value (in seconds). The `expires_in` value, which must be a minimum of 30 seconds and a maximum of 3600 seconds, is how long Sinch will save the access token before asking for a new one. */
  endpoint: string;
}
