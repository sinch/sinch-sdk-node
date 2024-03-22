import { Recipient } from '../recipient';

/**
 * An CapabilityResponse contains the identity of the recipient for which will be perform a capability lookup.
 */
export interface LookupCapabilityResponse {

  /** The ID of the app to use for capability lookup. */
  app_id?: string;
  /** @see Recipient */
  recipient?: Recipient;
  /** ID for the asynchronous response, will be generated if not set. */
  request_id?: string;
}
