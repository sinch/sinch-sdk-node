/**
 * Represents a response to a choice message.
 */
export interface ChoiceResponseMessage {

  /** The message id containing the choice. */
  message_id: string;
  /** The postback_data defined in the selected choice. */
  postback_data: string;
}
