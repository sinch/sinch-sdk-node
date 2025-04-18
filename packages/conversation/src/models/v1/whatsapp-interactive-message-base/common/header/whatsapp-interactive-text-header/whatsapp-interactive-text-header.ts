/**
 * Header of the interactive message with text.
 */
export interface WhatsAppInteractiveTextHeader {
  /** Must be set to text. */
  type: 'text';
  /** Text for the header. Formatting allows emojis, but not Markdown. */
  text: string;
}
