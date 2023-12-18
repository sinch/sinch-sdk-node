/**
 * Model: FlashCallInitiateVerificationResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { FlashCallInitiateVerificationResponseFlashCall } from '../flash-call-initiate-verification-response-flash-call';
import { LinksObject } from '../links-object';

export interface FlashCallInitiateVerificationResponse {

  /** Verification identifier used to query for status. */
  id?: string;
  /** The value of the method used for the Verification. For Flashcall Verifications, this will always be `flashCall`. */
  method?: MethodEnum;
  /** @see FlashCallInitiateVerificationResponseFlashCall */
  flashCall?: FlashCallInitiateVerificationResponseFlashCall;
  /** @see LinksObject */
  _links?: LinksObject;
}

export type MethodEnum = 'flashCall';
