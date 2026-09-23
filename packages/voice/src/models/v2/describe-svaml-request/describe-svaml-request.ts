import { SvamlInput } from '../svaml-input';

/**
 * Request payload for describing a SVAML document before using it in a call.
 */
export interface DescribeSvamlRequest {
  /** The SVAML payload to describe. */
  svaml: SvamlInput;
}
