import { Recipient } from '../recipient';

export interface LookupCapability {

  /** The ID of the app to use for capability lookup. */
  app_id: string;
  /** @see Recipient */
  recipient: Recipient;
  /** ID for the asynchronous response, will be generated if not set. Currently, this field is not used for idempotency. */
  request_id?: string;
}
