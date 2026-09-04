import { Message } from '../../message';
import { MessageEvents } from './message-events';

/**
 * Plays one or more messages on the call. Multiple messages in the array are played sequentially in order.  This is a non-blocking command — the next command in the sequence executes immediately while messages play in parallel.  Playback outcomes are handled via the `events` property. The `onFinish` event can be used to run a command after all messages complete.
 */
export interface MessagesCommand {
  /** Command to play a message on the channel */
  command: CommandEnum;
  /** Name of the message for identification and reference within the call session.  This name is used to uniquely identify the message and must be unique within the current call session. This name can be referenced in other commands (e.g., `stopMessages`) to control this specific message. */
  messagesName?: string;
  /** Ordered list of messages to play. */
  messages: Message[];
  /** @see MessageEvents */
  events?: MessageEvents;
}
export type CommandEnum = 'messages' | string;
/** Validation regex for messagesName */
export const messagesNamePattern = /^\S+$/;
