import { CalloutRequestEventResponseCallout } from '../callout-request-event-response-callout';
import { ActionEnum } from '../enums';

export interface CalloutRequestEventResponse {

  /** Determines whether the verification can be executed. */
  action?: ActionEnum;
  /** @see CalloutRequestEventResponseCallout */
  callout?: CalloutRequestEventResponseCallout;
}
