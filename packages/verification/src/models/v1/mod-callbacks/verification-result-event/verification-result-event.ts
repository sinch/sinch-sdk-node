import { Identity } from '../../identity';
import { ReasonEnum, SourceEnum, VerificationStatusEnum } from '../../enums';

export interface VerificationResultEvent {

  /** The ID of the verification request. */
  id: string;
  /** The type of the event. */
  event: 'VerificationResultEvent';
  /** The verification method. */
  method: MethodEnum;
  /** @see Identity */
  identity: Identity;
  /** The status of the verification request. */
  status: VerificationStatusEnum;
  /** Displays the reason why a verification has `FAILED`, was `DENIED`, or was `ABORTED`. */
  reason?: ReasonEnum;
  /** The reference ID that was optionally passed together with the verification request. */
  reference?: string;
  /** Free text that the client is sending, used to show if the call/SMS was intercepted or not. */
  source?: SourceEnum;
  /** A custom string that can be provided during a verification request. */
  custom?: string;
}

export type MethodEnum = 'sms' | 'flashcall' | 'callout' | 'seamless';
