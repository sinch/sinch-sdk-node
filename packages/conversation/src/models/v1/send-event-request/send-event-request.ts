import { AppEvent } from '../app-event';
import { ConversationChannel } from '../conversation-channel';
import { MessageQueue } from '../message-queue';
import { Recipient } from '../recipient';

export interface SendEventRequest {

  /** The ID of the app sending the event. */
  app_id: string;
  /** Overwrites the default callback url for delivery receipts for this message The REST URL should be of the form: `http://host[:port]/path` */
  callback_url?: string;
  /** Optional. A single element array that dictates on what channel should the Conversation API try to send the event. It overrides any default set on the contact. Providing more than one option has no effect. */
  channel_priority_order?: ConversationChannel[];
  /** @see AppEvent */
  event: AppEvent;
  /** Optional. Eventual metadata that should be associated to the event. */
  event_metadata?: string;
  /** @see MessageQueue */
  queue?: MessageQueue;
  /** @see Recipient */
  recipient: Recipient;
}
