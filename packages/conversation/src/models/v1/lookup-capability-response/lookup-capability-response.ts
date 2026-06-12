import { Recipient } from '../recipient';

/**
 * A CapabilityResponse contains the identity of the recipient for which
 * a capability lookup will be performed.
 */
export interface LookupCapabilityResponse {

  /** The ID of the app to use for capability lookup. */
  app_id?: string;
  /** @see Recipient */
  recipient?: Recipient;
  /** ID for the asynchronous response, will be generated if not set. */
  request_id?: string;
}
