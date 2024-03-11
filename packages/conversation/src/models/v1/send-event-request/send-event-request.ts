import { ConversationChannel } from '../conversation-channel';
import { Recipient } from '../recipient';
import { MessageQueue } from '../enums';
import { ComposingEvent } from '../composing-event';
import { ComposingEndEvent } from '../composing-end-event';
import { CommentReplyEvent } from '../comment-reply-event';
import { AgentJoinedEvent } from '../agent-joined-event';
import { AgentLeftEvent } from '../agent-left-event';
import { GenericEvent } from '../generic-event';
import { AppEvent } from '../app-event';

export interface SendEventRequestBase<T extends Recipient> {

  /** The ID of the app sending the event. */
  app_id: string;
  /** Overwrites the default callback url for delivery receipts for this message The REST URL should be of the form: `http://host[:port]/path` */
  callback_url?: string;
  /** Optional. A single element array that dictates on what channel should the Conversation API try to send the event. It overrides any default set on the contact. Providing more than one option has no effect. */
  channel_priority_order?: ConversationChannel[];
  /** Optional. Eventual metadata that should be associated to the event. */
  event_metadata?: string;
  /** @see MessageQueue */
  queue?: MessageQueue;
  /** @see Recipient */
  recipient: T;
}

export interface SendEventRequest<T extends Recipient> extends SendEventRequestBase<T> {
  /** @see AppEvent */
  event: AppEvent;
}
export interface SendComposingEventRequest<T extends Recipient> extends SendEventRequestBase<T> {
  /** @see ComposingEvent */
  event: ComposingEvent;
}

export interface SendComposingEndEventRequest<T extends Recipient> extends SendEventRequestBase<T> {
  /** @see ComposingEndEvent */
  event: ComposingEndEvent;
}

export interface SendCommentReplyEventRequest<T extends Recipient> extends SendEventRequestBase<T> {
  /** @see CommentReplyEvent */
  event: CommentReplyEvent;
}

export interface SendAgentJoinedEventRequest<T extends Recipient> extends SendEventRequestBase<T> {
  /** @see AgentJoinedEvent */
  event: AgentJoinedEvent;
}

export interface SendAgentLeftEventRequest<T extends Recipient> extends SendEventRequestBase<T> {
  /** @see AgentLeftEvent */
  event: AgentLeftEvent;
}

export interface SendGenericEventRequest<T extends Recipient> extends SendEventRequestBase<T> {
  /** @see GenericEvent */
  event: GenericEvent;
}
