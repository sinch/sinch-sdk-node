import { WhatsAppInteractiveNfmReply } from '../whatsapp-interactive-nfm-reply';

/**
 * A contact message containing a channel specific message (not supported by OMNI types).
 */
export interface ChannelSpecificContactMessage {
  /** The message type. */
  message_type: 'nfm_reply';
  /** @see WhatsAppInteractiveNfmReplyMessage */
  message: WhatsAppInteractiveNfmReplyMessage;
}

/**
 * A WhatsApp interactive contact message containing the nfm_reply.
 */
interface WhatsAppInteractiveNfmReplyMessage {
  /** The interactive message type. */
  type: string;
  /** @see WhatsAppInteractiveNfmReply */
  nfm_reply: WhatsAppInteractiveNfmReply;
}
