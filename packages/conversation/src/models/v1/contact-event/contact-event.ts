import { ComposingEvent } from '../composing-event';
import { ComposingEndEvent } from '../composing-end-event';
import { CommentEvent } from '../comment-event';
import { GenericEvent } from '../generic-event';
import { ConversationDeletedEvent } from '../conversation-deleted-event';

/** Message originating from a contact */
export type ContactEvent =
  ContactComposingEvent
  | ContactComposingEndEvent
  | ContactConversationDeletedEvent
  | ContactCommentEvent
  | ContactGenericEvent;

interface ContactComposingEvent extends ComposingEvent {
  // Exclude other event types
  composing_end_event?: never;
  conversation_deleted_event?: never;
  comment_event?: never;
  generic_event?: never;
}

interface ContactComposingEndEvent extends ComposingEndEvent {
  // Exclude other event types
  composing_event?: never;
  conversation_deleted_event?: never;
  comment_event?: never;
  generic_event?: never;
}

interface ContactConversationDeletedEvent extends ConversationDeletedEvent {
  // Exclude other event types
  composing_event?: never;
  composing_end_event?: never;
  comment_event?: never;
  generic_event?: never;
}

interface ContactCommentEvent extends CommentEvent {
  // Exclude other event types
  composing_event?: never;
  composing_end_event?: never;
  conversation_deleted_event?: never;
  generic_event?: never;
}

interface ContactGenericEvent extends GenericEvent {
  // Exclude other event types
  composing_event?: never;
  composing_end_event?: never;
  conversation_deleted_event?: never;
  comment_event?: never;
}
