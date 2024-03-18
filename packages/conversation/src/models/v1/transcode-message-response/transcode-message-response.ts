import { ConversationChannel } from '../conversation-channel';

export interface TranscodeMessageResponse {

  /** The transcoded message for the different channels. The keys in the map correspond to channel names, as defined by the type ConversationChannel. */
  transcoded_message?: { [key in ConversationChannel]?: string; };
}
