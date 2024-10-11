/**
 * There was a problem with the phone line. The call could not be placed. Many times you can just try again
 */
export interface CallError {
  /** Type of error for the Call */
  errorType?: 'CALL_ERROR';
  /** A developer-facing error message */
  errorMessage?: string;
  /** The error code returned describing the error of the call */
  errorCode?: CallErrorCodeEnum;
}

export type CallErrorCodeEnum = '11' | '15' | '16' | '17' | '19' | '30' | '32' | '34' | '43' | '49' | string;
