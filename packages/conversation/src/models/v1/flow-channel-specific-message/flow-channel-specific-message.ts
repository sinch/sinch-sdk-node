import { WhatsAppInteractiveBody } from '../whatsapp-interactive-body';
import { WhatsAppInteractiveFooter } from '../whatsapp-interactive-footer';
import { WhatsAppInteractiveTextHeader } from '../whatsapp-interactive-text-header';
import { WhatsAppInteractiveImageHeader } from '../whatsapp-interactive-image-header';
import { WhatsAppInteractiveDocumentHeader } from '../whatsapp-interactive-document-header';
import { WhatsAppInteractiveVideoHeader } from '../whatsapp-interactive-video-header';

/**
 * A message type for sending WhatsApp Flows.
 */
export interface FlowChannelSpecificMessage {

  /** @see FlowChannelSpecificMessageHeader */
  header?: FlowChannelSpecificMessageHeader;
  /** @see WhatsAppInteractiveBody */
  body?: WhatsAppInteractiveBody;
  /** @see WhatsAppInteractiveFooter */
  footer?: WhatsAppInteractiveFooter;
  /** ID of the Flow. */
  flow_id: string;
  /** Generated token which is an identifier. */
  flow_token?: string;
  /** The mode in which the flow is. */
  flow_mode?: 'draft' | 'published';
  /** Text which is displayed on the Call To Action button (20 characters maximum, emoji not supported). */
  flow_cta: string;
  /** */
  flow_action?: 'navigate' | 'data_exchange';
  /** @see FlowChannelSpecificMessageFlowActionPayload */
  flow_action_payload?: FlowChannelSpecificMessageFlowActionPayload;
}

type FlowChannelSpecificMessageHeader =
  WhatsAppInteractiveTextHeader
  | WhatsAppInteractiveImageHeader
  | WhatsAppInteractiveDocumentHeader
  | WhatsAppInteractiveVideoHeader;

interface FlowChannelSpecificMessageFlowActionPayload {
  /** The ID of the screen displayed first. This must be an entry screen. */
  screen?: string;
  /** Data for the first screen. */
  data?: object;
}
