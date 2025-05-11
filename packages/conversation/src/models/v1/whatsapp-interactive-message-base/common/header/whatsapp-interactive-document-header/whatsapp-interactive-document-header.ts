import { WhatsAppInteractiveHeaderMedia } from '../whatsapp-interactive-header-media';

/**
 * Header of the interactive message with document.
 */
export interface WhatsAppInteractiveDocumentHeader {
  /** Must be set to document. */
  type: 'document';
  /** @see WhatsAppInteractiveHeaderMedia */
  document: WhatsAppInteractiveHeaderMedia;
}
