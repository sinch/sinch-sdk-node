/**
 * Model: GetCallResponseObj
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */
import { ReasonEnum, ResultEnum } from '../enums';

export interface GetCallResponseObj {

  /** Contains the caller information. */
  from?: string;
  /** Contains the callee information. */
  to?: GetCallResponseTo;
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
  userRate?: GetCallResponseUserRate;
  /** The total amount charged for the call. */
  debit?: GetCallResponseDebit;
}

export interface GetCallResponseTo {
  /** The type of the destination. */
  type?: string;
  /** The phone number, user name, or other identifier of the destination. */
  endpoint?: string;
}
export interface GetCallResponseUserRate {
  /** The currency in which the call is charged. */
  currencyId?: string;
  /** The rate per minute that was charged for the call. */
  amount?: number;
}

export interface GetCallResponseDebit {
  /** The currency ID of the rate, for example, `USD`. */
  currencyId?: string;
  /** The total amount debited for the call. */
  amount?: number;
}

export type DomainEnum = 'pstn';
export type StatusEnum = 'ONGOING' | 'FINAL';
