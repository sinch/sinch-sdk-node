/**
 * Result of a SVAML validation request.
 *
 * HTTP `200` indicates the validation was performed — not that the payload is valid.
 * Inspect `isValid` to determine the outcome.
 */
export interface ValidateSvamlResponse {
  /** `true` if the submitted SVAML payload passed validation; `false` if one or more errors were found. */
  isValid: boolean;
  /**
   * Validation error messages describing why the SVAML payload is invalid.
   *
   * Present only when `isValid` is `false`. Each entry identifies a specific problem,
   * including the affected field or command where applicable.
   */
  errors?: string[];
}
