/**
 * Ends a call leg. This is a non-blocking command — execution continues to the next command in the sequence even though the call has been ended. The `onHangup` event is triggered for the call leg that was ended.  Any subsequent commands that target the ended call leg (such as `messages` or other media commands) are valid but will not be executed. Commands that operate independently — such as initiating a new call with `dial` — will execute normally. This makes it possible, for example, to end one call and immediately start another within the same sequence.
 */
export interface HangupCommand {
  /** Hangup call */
  command: 'hangup';
  /** Name of the call leg to end, as set by `callName` in the `dial` command.  If omitted, the current call leg is ended. */
  callName?: string;
}
/** Validation regex for callName */
export const callNamePattern = /^\S+$/;
