import { WhatsAppInteractiveHeaderMedia } from '../whatsapp-interactive-header-media';

/**
 * Header of the interactive message with image.
 */
export interface WhatsAppInteractiveImageHeader {
  /** Must be set to image. */
  type: 'image';
  /** @see WhatsAppInteractiveHeaderMedia */
  image: WhatsAppInteractiveHeaderMedia;
}
