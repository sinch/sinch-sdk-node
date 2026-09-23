export interface ReadMessageEvent {
  /** Marks an inbound (contact) message as read on the channel, producing a read receipt for the contact. Supported on the WhatsApp channel. */
  read_message_event: Record<string, never>;
}
