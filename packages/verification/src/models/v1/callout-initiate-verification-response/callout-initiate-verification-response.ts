/**
 * Model: CalloutInitiateVerificationResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { LinksObject } from '../links-object';

export interface CalloutInitiateVerificationResponse {

  /** Verification identifier used to query for status. */
  id?: string;
  /** The value of the method used for the Verification. For Phone Call Verifications, this will always be `callout`. */
  method?: MethodEnum;
  /** @see LinksObject */
  _links?: LinksObject;
}

export type MethodEnum = 'callout';
