import { EmergencyAddressValidationResultCode } from '../enums';
import { EmergencyAddress } from '../emergency-address';

/**
 * Response object containing details of the emergency address.
 */
export interface ValidateEmergencyAddressResponse {
  /** The phone number in E.164 format with leading `+`. */
  phoneNumber?: string;
  /** User supplied name for the phone number. */
  displayName?: string;
  /** @see EmergencyAddress */
  validatedAddress?: EmergencyAddress;
  /** @see EmergencyAddressValidationResultCode */
  validationResult?: EmergencyAddressValidationResultCode;
  /** Validation result message */
  validationMessage?: string;
  /** @see EmergencyAddress */
  correctedAddress?: EmergencyAddress;
  /** List of candidate addresses (only available if validationResult == NO_MATCH) */
  candidateAddresses?: EmergencyAddress[];
}
