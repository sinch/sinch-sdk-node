import { WhatsAppInteractiveHeaderMedia } from '../whatsapp-interactive-header-media';

/**
 * Header of the interactive message with video.
 */
export interface WhatsAppInteractiveVideoHeader {
  /** Must be set to video. */
  type: 'video';
  /** @see WhatsAppInteractiveHeaderMedia */
  video: WhatsAppInteractiveHeaderMedia;
}
