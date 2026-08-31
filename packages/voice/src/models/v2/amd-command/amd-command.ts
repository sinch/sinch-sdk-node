import { AmdEvents } from '../amd-events';

/**
 * AMD (Answering Machine Detection) command to detect what answered the call. Possible outcomes are: human, machine, beep, or unknown.  This is a non-blocking command — the next command in the sequence executes immediately while detection runs in parallel. Results are delivered via the `events` property.
 */
export interface AmdCommand {
  /** Command to run Answering Machine Detection on the call */
  command: CommandEnum;
  /** @see AmdEvents */
  events?: AmdEvents;
}
export type CommandEnum = 'amd' | string;
