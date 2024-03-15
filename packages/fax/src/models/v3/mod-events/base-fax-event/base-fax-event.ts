import { Fax } from '../../fax';
import { FaxWebhookEvent } from '../../enums';

export interface BaseFaxEvent {
  /** The different events that can trigger a webhook */
  event?: FaxWebhookEvent;
  /** Time of the event. */
  eventTime?: Date;
  /** @see Fax */
  fax?: Fax;
}

export interface FaxEventJson extends BaseFaxEvent {}

export interface FaxEventFormData extends BaseFaxEvent {
  /** The fax content as a PDF attachment to the body.  <application/pdf> */
  file?: string;
}
