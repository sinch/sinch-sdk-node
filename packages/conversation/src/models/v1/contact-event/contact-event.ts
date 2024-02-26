import { ComposingEvent } from '../composing-event';
import { ComposingEndEvent } from '../composing-end-event';
import { CommentEvent } from '../comment-event';
import { GenericEvent } from '../generic-event';
import { ConversationDeletedEvent } from '../conversation-deleted-event';

/** Message originating from a contact */
export type ContactEvent =
  ComposingEvent
  | ComposingEndEvent
  | ConversationDeletedEvent
  | CommentEvent
  | GenericEvent;
