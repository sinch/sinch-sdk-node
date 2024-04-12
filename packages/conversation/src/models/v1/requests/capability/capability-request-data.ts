import { Recipient } from '../../recipient';
import { LookupCapabilityRequest } from '../../lookup-capability-request';

export interface LookupCapabilityRequestData<T extends Recipient> {
  /** The lookup capability request. */
  'lookupCapabilityRequestBody': LookupCapabilityRequest<T>;
}
