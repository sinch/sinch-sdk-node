import { WhatsAppInteractiveBody } from '../whatsapp-interactive-body';
import { WhatsAppInteractiveFooter } from '../whatsapp-interactive-footer';
import { WhatsappInteractiveHeader } from '../whatsapp-interactive-header';

export interface WhatsAppInteractiveMessageBase {
  /** @see WhatsappInteractiveHeader */
  header?: WhatsappInteractiveHeader;
  /** @see WhatsAppInteractiveBody */
  body?: WhatsAppInteractiveBody;
  /** @see WhatsAppInteractiveFooter */
  footer?: WhatsAppInteractiveFooter;
}
