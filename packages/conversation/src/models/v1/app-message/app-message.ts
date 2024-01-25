import { AppMessageAdditionalProperties } from '../app-message-additional-properties';
import { AppMessageMessage } from '../app-message-message';

/**
 * Message originating from an app
 */
export interface AppMessage {

  /** @see AppMessageMessage */
  message?: AppMessageMessage;
  /** Optional. Channel specific messages, overriding any transcoding. The key in the map must point to a valid conversation channel as defined by the enum ConversationChannel. */
  explicit_channel_message?: object;
  /** @see AppMessageAdditionalProperties */
  additionalProperties?: AppMessageAdditionalProperties;

  /** TBC: Not documented */
  agent?: any | null;
  /** TBC: Not documented */
  explicit_channel_omni_message?: object;
}
