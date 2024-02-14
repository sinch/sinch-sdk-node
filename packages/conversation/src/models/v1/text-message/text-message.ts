/**
 * A message containing only text.
 */
export interface TextMessage {

  /** A message containing only text. */
  text_message: TextMessageItem;
}

export interface TextMessageItem {

  /** The text to be sent. */
  text: string;
}
