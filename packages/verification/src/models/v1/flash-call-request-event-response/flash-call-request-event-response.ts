/**
 * Model: FlashCallRequestEventResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { FlashCallRequestEventResponseFlashCall } from '../flash-call-request-event-response-flash-call';

export interface FlashCallRequestEventResponse {

  /** Determines whether the verification can be executed. */
  action?: ActionEnum;
  /** @see FlashCallRequestEventResponseFlashCall */
  flashCall?: FlashCallRequestEventResponseFlashCall;
}

export type ActionEnum = 'allow' | 'deny';

