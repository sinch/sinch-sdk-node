import { FaxCompletedEvent, IncomingFaxEvent } from '../mod-events';

export type FaxWebhookEventParsed = IncomingFaxEvent | FaxCompletedEvent;
