import { WhatsAppInteractiveMessageBase } from '../whatsapp-interactive-message-base';

/** @deprecated */
export type FlowChannelSpecificMessage = WhatsAppFlow;

/**
 * A message type for sending WhatsApp Flows.
 */
export interface WhatsAppFlow extends WhatsAppInteractiveMessageBase {
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
  /** @see FlowActionPayload */
  flow_action_payload?: FlowActionPayload;
}

/** @deprecated */
export type FlowChannelSpecificMessageFlowActionPayload = FlowActionPayload;

export interface FlowActionPayload {
  /** The ID of the screen displayed first. This must be an entry screen. */
  screen?: string;
  /** Data for the first screen. */
  data?: object;
}
