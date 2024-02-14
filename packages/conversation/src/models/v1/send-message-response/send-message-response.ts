export interface SendMessageResponse {

  /** Timestamp when the Conversation API accepted the message for delivery to the referenced contact. */
  accepted_time?: Date;
  /** The ID of the message. */
  message_id?: string;
}
