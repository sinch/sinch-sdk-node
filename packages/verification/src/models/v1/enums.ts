export type ActionEnum = 'allow' | 'deny';

export type VerificationStatusEnum = 'PENDING'
  | 'SUCCESSFUL'
  | 'FAIL'
  | 'DENIED'
  | 'ABORTED'
  | 'ERROR';

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
  | 'Hung up without entering valid code';

export type SourceEnum = 'intercepted' | 'manual';

export type CallResult = 'ANSWERED' | 'COMPLETED' | 'NO_ANSWER' | 'CANCEL' | 'BUSY' | 'FAILED' | string;
