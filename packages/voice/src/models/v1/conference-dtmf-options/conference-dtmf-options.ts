/**
 * Options to control how DTMF signals are used by the participant in the conference. For information on how to use this feature, read more [here](../../conference-dtmf).
 */
export interface ConferenceDtmfOptions {

  /** Determines what DTMF mode the participant will use in the call. */
  mode?: string;
  /** The maximum number of accepted digits before sending the collected input via a PIE callback. The default value is `1`. If the value is greater than `1`, the PIE callback is triggered by one of the three following events:   - No additional digit is entered before the `timeoutMills` timeout period has elapsed.   - The `#` character is entered.   - The maximum number of digits has been entered. */
  maxDigits?: number;
  /** The number of milliseconds that the system will wait between entered digits before triggering the PIE callback. The default value is `3000`. */
  timeoutMills?: number;
}


