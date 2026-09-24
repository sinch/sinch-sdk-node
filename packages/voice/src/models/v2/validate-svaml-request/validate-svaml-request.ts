import { SvamlInput } from '../svaml-input';

/**
 * Request payload for validating a SVAML document before using it in a call.
 *
 * Use `validationType` to control how strictly the payload is checked.
 */
export interface ValidateSvamlRequest {
  /** The SVAML payload to validate. */
  svaml: SvamlInput;
  /**
   * Controls how strictly the SVAML payload is validated.
   * `NORMAL` applies the same rules used when initiating a call. Unknown or extra
   * properties are ignored. `STRICT` returns errors for unrecognised or unexpected
   * properties. Defaults to `NORMAL` when omitted.
   */
  validationType?: ValidationTypeEnum;
}

export type ValidationTypeEnum = 'NORMAL' | 'STRICT' | string;
