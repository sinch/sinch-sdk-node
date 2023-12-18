/**
 * Model: SMSInitiateVerificationResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { LinksObject } from '../links-object';
import { SMSInitiateVerificationResponseSms } from '../sms-initiate-verification-response-sms';

export interface SMSInitiateVerificationResponse {

  /** Verification identifier used to query for status. */
  id?: string;
  /** The value of the method used for the Verification. For SMS Verifications, this will always be `sms`. */
  method?: MethodEnum;
  /** @see SMSInitiateVerificationResponseSms */
  sms?: SMSInitiateVerificationResponseSms;
  /** @see LinksObject */
  _links?: LinksObject[];
}

export type MethodEnum = 'sms';
