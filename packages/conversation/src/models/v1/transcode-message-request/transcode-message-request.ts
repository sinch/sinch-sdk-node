import { ConversationChannel } from '../conversation-channel';
import { AppMessage } from '../app-message';

export interface TranscodeMessageRequest {

  /** The ID of the app used to transcode the message. */
  app_id: string;
  /** @see AppMessage */
  app_message: AppMessage;
  /** The list of channels for which the message shall be transcoded to. */
  channels: ConversationChannel[];
  /** Optional. */
  from?: string;
  /** Optional. */
  to?: string;
}
