import {
  WhatsAppInteractiveDocumentHeader,
  WhatsAppInteractiveImageHeader,
  WhatsAppInteractiveTextHeader,
  WhatsAppInteractiveVideoHeader,
} from '../header';

/** @deprecated */
export type WhatsappInteractiveHeader = WhatsAppInteractiveHeader;

export type WhatsAppInteractiveHeader =
  WhatsAppInteractiveTextHeader
  | WhatsAppInteractiveImageHeader
  | WhatsAppInteractiveDocumentHeader
  | WhatsAppInteractiveVideoHeader;
