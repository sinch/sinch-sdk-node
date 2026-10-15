/**
 * Stops a message sequence started by a `messages` command. It will also cancel any messages with specified `messagesName` that will appear in the call session in the future.  This is a non-blocking command.
 */
export interface StopMessagesCommand {
  /** Command to stop playing messages */
  command: 'stopMessages';
  /** Name of the message sequence to stop, as set by `messagesName` in the `messages` command. */
  messagesName: string;
}
/** Validation regex for messagesName */
export const messagesNamePattern = /^\S+$/;
