import { WhatsAppInteractiveTextHeader } from '../whatsapp-interactive-text-header';
import { WhatsAppInteractiveImageHeader } from '../whatsapp-interactive-image-header';
import { WhatsAppInteractiveDocumentHeader } from '../whatsapp-interactive-document-header';
import { WhatsAppInteractiveVideoHeader } from '../whatsapp-interactive-video-header';

export type WhatsappInteractiveHeader =
  WhatsAppInteractiveTextHeader
  | WhatsAppInteractiveImageHeader
  | WhatsAppInteractiveDocumentHeader
  | WhatsAppInteractiveVideoHeader;
