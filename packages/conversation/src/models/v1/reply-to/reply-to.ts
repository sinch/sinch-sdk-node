/**
 * If the contact message was a response to a previous App message then this field contains information about that.
 */
export interface ReplyTo {

  /** Required. The Id of the message that this is a response to */
  message_id: string;
}
