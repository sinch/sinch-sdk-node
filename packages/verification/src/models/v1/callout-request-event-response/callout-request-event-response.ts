/**
 * Model: CalloutRequestEventResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { CalloutRequestEventResponseCallout } from '../callout-request-event-response-callout';

export interface CalloutRequestEventResponse {

  /** Determines whether the verification can be executed. */
  action?: ActionEnum;
  /** @see CalloutRequestEventResponseCallout */
  callout?: CalloutRequestEventResponseCallout;
}

export type ActionEnum = 'allow' | 'deny';

