export interface SendEmailResponse {
  /** The unique identifier of the message as defined by [RFC-2392](https://datatracker.ietf.org/doc/html/rfc2392). */
  id: string;
  /** A success message */
  message: string;
}

export interface SendEmailResponseFromApi {
  /** The unique identifier of the message as defined by [RFC-2392](https://datatracker.ietf.org/doc/html/rfc2392). */
  id: string;
  /** A success message */
  message: string;
}
