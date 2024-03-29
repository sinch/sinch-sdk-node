import { FlowChannelSpecificMessage } from '../flow-channel-specific-message';

/**
 * A message containing a channel specific message (not supported by OMNI types).
 */
export interface ChannelSpecificMessage {
  /** @see MessageTypeEnum */
  message_type: 'FLOWS';
  /** @see FlowChannelSpecificMessage */
  message: FlowChannelSpecificMessage;
}
