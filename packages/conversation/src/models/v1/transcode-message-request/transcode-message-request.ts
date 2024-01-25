import { ConversationChannel } from '../conversation-channel';
import { AppMessageMessage } from '../app-message-message';

export interface TranscodeMessageRequest {

  /** The ID of the app used to transcode the message. */
  app_id: string;
  /** @see AppMessageMessage */
  app_message: AppMessageMessage;
  /** The list of channels for which the message shall be transcoded to. */
  channels: ConversationChannel[];
  /** Optional. */
  from?: string;
  /** Optional. */
  to?: string;
}
