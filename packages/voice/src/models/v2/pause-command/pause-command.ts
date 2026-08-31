/**
 * Delays execution of the next command in the sequence for a specified duration. This is a blocking command — no further commands execute until the pause completes.  The pause does not affect call audio; the call remains connected and audio continues uninterrupted.
 */
export interface PauseCommand {
  /** Pause execution. */
  command: CommandEnum;
  /** Duration of the pause in milliseconds. */
  durationMilliseconds: number;
}
export type CommandEnum = 'pause' | string;
