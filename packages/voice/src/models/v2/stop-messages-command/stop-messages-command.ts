/**
 * Stops a message sequence previously started by a `messages` command. Use `messagesName` to target a specific sequence and `flags` to control whether only the current message or all queued messages are cancelled.   This is a non-blocking command.
 */
export interface StopMessagesCommand {
  /** Command to stop playing messages */
  command: CommandEnum;
  /** Name of the message sequence to stop, as set by `messagesName` in the `messages` command. */
  messagesName: string;
  /** Controls how much of the sequence is stopped — only the currently playing message or all remaining queued messages. */
  flags?: FlagsEnum;
}
export type CommandEnum = 'stopMessages' | string;
export type FlagsEnum = 'ONLY_PLAYING' | 'ALL_FROM_NOW_ON' | string;
/** Validation regex for messagesName */
export const messagesNamePattern = /^\S+$/;
