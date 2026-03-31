/** Determines whether the verification can be executed. */
export type ActionEnum = 'allow' | 'deny';

/** Selects type of code which will be sent to customer */
export type CodeType = 'Numeric' | 'Alpha' | 'Alphanumeric' | string;

/** Selects type of code which will be sent to customer */
export type WhatsAppCodeType = 'Numeric' | 'Alpha' | 'Alphanumeric' | string;

/** The status of the verification */
export type VerificationStatusEnum = 'PENDING'
  | 'SUCCESSFUL'
  | 'FAIL'
  | 'DENIED'
  | 'ABORTED'
  | 'ERROR'
  | string;

/** Displays the reason why a verification has `FAILED`, was `DENIED`, or was `ABORTED`. */
export type ReasonEnum = 'Fraud'
  | 'Not enough credit'
  | 'Blocked'
  | 'Denied by callback'
  | 'Invalid callback'
  | 'Internal error'
  | 'Destination denied'
  | 'Network error or number unreachable'
  | 'Failed pending'
  | 'SMS delivery failure'
  | 'Invalid CLI'
  | 'Invalid code'
  | 'Expired'
  | 'Hung up without entering valid code'
  | string;

/** With the SMS verification method, a user's phone number is verified by sending an SMS containing an OTP code that must be manually returned. If you are are using an Android handset, you could instead intercept the SMS message delivery and capture the OTP code automatically. */
export type SourceEnum = 'intercepted' | 'manual';

/** The type of the call result. */
export type CallResult = 'ANSWERED' | 'COMPLETED' | 'NO_ANSWER' | 'CANCEL' | 'BUSY' | 'FAILED' | string;
