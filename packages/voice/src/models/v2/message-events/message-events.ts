import { SvamlCommand } from '../svaml-command';

/**
 * SVAML commands to execute based on message playback outcomes.
 */
export interface MessageEvents {
  /** Commands to execute when all messages in the sequence have finished playing.  */
  onFinish?: SvamlCommand[];
}
