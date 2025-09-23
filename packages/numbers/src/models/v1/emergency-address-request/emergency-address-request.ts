import { EmergencyAddress } from '../emergency-address';

/**
 * Request for emergency address.
 */
export interface EmergencyAddressRequest {
  /** Name for emergency address. */
  displayName: string;
  /** @see EmergencyAddress */
  address: EmergencyAddress;
}
