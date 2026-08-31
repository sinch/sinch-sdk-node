/**
 * Answers an inbound call leg. This is a non-blocking command — execution continues to the next command in the sequence immediately after the answer is initiated.
 */
export interface AnswerCommand {
  /** Answer call */
  command: CommandEnum;
}
export type CommandEnum = 'answer' | string;
