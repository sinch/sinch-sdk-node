/**
 * The interactive nfm reply message.
 */
export interface WhatsAppInteractiveNfmReply {
  /** The nfm reply message type. */
  name: 'flow' | 'address_message';
  /** The JSON specific data. */
  response_json: string;
  /** The message body. */
  body: string;
}
