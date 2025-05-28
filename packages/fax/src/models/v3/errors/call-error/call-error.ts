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

export type CallErrorCodeEnum = 11 | 15 | 16 | 17 | 19 | 30 | 32 | 34 | 43 | 49 | number;

export const callErrorCodeLabels: Record<CallErrorCodeEnum, string> = {
  11: 'The call dropped prematurely',
  15: 'Congestion',
  16: 'Ring Timeout',
  17: 'Busy',
  19: 'Immediate Hangup',
  30: 'No answer from a fax machine.',
  32: 'Incompatible destination',
  34: 'Phone number not operational',
  43: 'Problem establishing connection',
  49: 'The destination phone number Is Not active',
};
