import { WhatsAppInteractiveBody, WhatsAppInteractiveFooter, WhatsAppInteractiveHeader } from './common';

export interface WhatsAppInteractiveMessageBase {
  /** @see WhatsAppInteractiveHeader */
  header?: WhatsAppInteractiveHeader;
  /** @see WhatsAppInteractiveBody */
  body?: WhatsAppInteractiveBody;
  /** @see WhatsAppInteractiveFooter */
  footer?: WhatsAppInteractiveFooter;
}
