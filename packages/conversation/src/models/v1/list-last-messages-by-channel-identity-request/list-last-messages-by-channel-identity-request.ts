import { ConversationChannel } from '../conversation-channel';
import { ConversationDirection, ConversationMessagesView, MessageSource } from '../enums';

/**
 * Request body for listing messages by channel identity. NOTE: You can use either contact_ids OR channel_identities, but not both in the same request.
 */
export interface ListLastMessagesByChannelIdentityRequest {
  /** Optional. Filter messages by `channel_identity`. */
  channel_identities?: string[];
  /** Optional. Resource name (id) of the contact. In case the messages source is set to `CONVERSATION_SOURCE`: Can list last messages by contact_id. In case the messages source is set to `DISPATCH_SOURCE`: The field is unsupported and cannot be set. */
  contact_ids?: string[];
  /** Optional. Resource name (id) of the app. */
  app_id?: string;
  /** Optional. Specifies the message source for which the request will be processed. Default is `DISPATCH_SOURCE`. */
  messages_source?: MessageSource;
  /** Optional. Maximum number of messages to fetch. Defaults to 10 and the maximum is 1000. */
  page_size?: number;
  /** Optional. Next page token previously returned if any. */
  page_token?: string;
  /** Optional. Specifies the representation in which messages should be returned. Default to `WITH_METADATA`. */
  view?: ConversationMessagesView;
  /** Optional. Only fetch messages with `accept_time` after this date. */
  start_time?: Date;
  /** Optional. Only fetch messages with `accept_time` before this date. */
  end_time?: Date;
  /** Optional. Only fetch messages from the `channel`. */
  channel?: ConversationChannel;
  /** Optional. Only fetch messages with the specified `direction`. If direction is not specified, it will list both TO_APP and TO_CONTACT messages. */
  direction?: ConversationDirection;
}
