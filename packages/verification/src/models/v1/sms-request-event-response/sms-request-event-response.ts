/**
 * Model: SMSRequestEventResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { SMSRequestEventResponseSms } from '../sms-request-event-response-sms';

export interface SMSRequestEventResponse {

  /** Determines whether the verification can be executed. */
  action?: ActionEnum;
  /** @see SMSRequestEventResponseSms */
  sms?: SMSRequestEventResponseSms;
}

export type ActionEnum = 'allow' | 'deny';

