import { ReasonEnum, SourceEnum, VerificationStatusEnum } from '../enums';
import { Identity } from '../identity';

export interface CalloutVerificationReportResponse {

  /** The unique ID of the verification request. */
  id?: string;
  /** The method of the verification request. This will always be `callout`. */
  method?: 'callout';
  /** The status of the verification request. */
  status?: VerificationStatusEnum;
  /** Displays the reason why a verification has `FAILED`, was `DENIED`, or was `ABORTED`. */
  reason?: ReasonEnum;
  /** The reference ID that was optionally passed together with the verification request. */
  reference?: string;
  /** Free text that the client is sending, used to show if the call/SMS was intercepted or not. */
  source?: SourceEnum;
  /** @see Identity */
  identity?: Identity;
  /** Shows whether the call is complete or not. */
  callComplete?: boolean;
}
