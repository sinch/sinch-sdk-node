import { ComposingEvent } from '../composing-event';
import { ComposingEndEvent } from '../composing-end-event';
import { CommentReplyEvent } from '../comment-reply-event';
import { AgentJoinedEvent } from '../agent-joined-event';
import { AgentLeftEvent } from '../agent-left-event';
import { GenericEvent } from '../generic-event';

/**
 * Event originating from an app
 */
export type AppEvent =
  ComposingEvent
  | ComposingEndEvent
  | CommentReplyEvent
  | AgentJoinedEvent
  | AgentLeftEvent
  | GenericEvent;
