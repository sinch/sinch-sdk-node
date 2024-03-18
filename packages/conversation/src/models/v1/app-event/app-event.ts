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
  AppComposingEvent
  | AppComposingEndEvent
  | AppCommentReplyEvent
  | AppAgentJoinedEvent
  | AppAgentLeftEvent
  | AppGenericEvent;

interface AppComposingEvent extends ComposingEvent {
  // Exclude other event types
  composing_end_event?: never;
  comment_reply_event?: never;
  agent_joined_event?: never;
  agent_left_event?: never;
  generic_event?: never;
}

interface AppComposingEndEvent extends ComposingEndEvent {
  // Exclude other event types
  composing_event?: never;
  comment_reply_event?: never;
  agent_joined_event?: never;
  agent_left_event?: never;
  generic_event?: never
}

interface AppCommentReplyEvent extends CommentReplyEvent {
  // Exclude other event types
  composing_event?: never;
  composing_end_event?: never;
  agent_joined_event?: never;
  agent_left_event?: never;
  generic_event?: never;
}

interface AppAgentJoinedEvent extends AgentJoinedEvent {
  // Exclude other event types
  composing_event?: never;
  composing_end_event?: never;
  comment_reply_event?: never;
  agent_left_event?: never;
  generic_event?: never;
}

interface AppAgentLeftEvent extends AgentLeftEvent {
  // Exclude other event types
  composing_event?: never;
  composing_end_event?: never;
  comment_reply_event?: never;
  agent_joined_event?: never;
  generic_event?: never;
}

interface AppGenericEvent extends GenericEvent {
  // Exclude other event types
  composing_event?: never;
  composing_end_event?: never;
  comment_reply_event?: never;
  agent_joined_event?: never;
  agent_left_event?: never;
}
