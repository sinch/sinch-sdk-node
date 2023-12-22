/**
 * Model: GetCallResponseObj
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


export interface GetCallResponseObj {

  /** Contains the caller information. */
  from?: string;
  /** Contains the callee information. */
  to?: string;
  /** Must be `pstn` for PSTN. */
  domain?: DomainEnum;
  /** The unique identifier of the call. */
  callId?: string;
  /** The duration of the call in seconds. */
  duration?: number;
  /** The status of the call. Either `ONGOING` or `FINAL` */
  status?: StatusEnum;
  /** Contains the result of a call. */
  result?: ResultEnum;
  /** Contains the reason why a call ended. */
  reason?: ReasonEnum;
  /** The date and time of the call. */
  timestamp?: Date;
  /** An object that can be used to pass custom information related to the call. */
  custom?: object;
  /** The rate per minute that was charged for the call. */
  userRate?: string;
  /** The total amount charged for the call. */
  debit?: string;
}

export type DomainEnum = 'pstn';
export type StatusEnum = 'ONGOING' | 'FINAL';
export type ResultEnum = 'N/A' | 'ANSWERED' | 'BUSY' | 'NOANSWER' | 'FAILED';
export type ReasonEnum = 'N/A' | 'TIMEOUT' | 'CALLERHANGUP' | 'CALLEEHANGUP' | 'BLOCKED' | 'NOCREDITPARTNER' | 'MANAGERHANGUP' | 'CANCEL' | 'GENERALERROR';

