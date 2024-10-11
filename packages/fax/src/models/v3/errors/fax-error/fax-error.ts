/**
 * A problem occurred during the fax communication process.
 */
export interface FaxError {
  /** Type of error for the fax */
  errorType?: 'FAX_ERROR';
  /** A developer-facing error message */
  errorMessage?: string;
  /** The error code returned describing the error of the call */
  errorCode?: FaxErrorCodeEnum;
}

export type FaxErrorCodeEnum = '6' | '7' | '8' | '10' | '12' | '13' | '14' | '18'
  | '20' | '21' | '22' | '25' | '26' | '28' | '29' | '31' | '38' | '40' | '41'
  | '44' | '46' | '48' | '53' | '60' | '63' | '68' | '75' | '76' | '77' | '79'
  | '80' | '82' | '84' | '113' | '117' | '119' | '131' | '132';
