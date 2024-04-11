import { ConversationMessagesView, MessageSource } from '../../enums';
import { ConversationChannel } from '../../conversation-channel';
import { Recipient } from '../../recipient';
import {
  SendCardMessageRequest,
  SendCarouselMessageRequest,
  SendChoiceMessageRequest,
  SendContactInfoMessageRequest,
  SendListMessageRequest,
  SendLocationMessageRequest,
  SendMediaMessageRequest,
  SendMessageRequest, SendTemplateMessageRequest, SendTextMessageRequest,
} from '../../send-message-request';
import { UpdateMessageRequest } from '../../update-message-request';

export interface DeleteMessageRequestData {
  /** The unique ID of the message. */
  'message_id': string;
  /** Specifies the message source for which the request will be processed. Used for operations on messages in Dispatch Mode. For more information, see [Processing Modes](../../../../../conversation/processing-modes/). */
  'messages_source'?: MessageSource;
}
export interface GetMessageRequestData {
  /** The unique ID of the message. */
  'message_id': string;
  /** Specifies the message source for which the request will be processed. Used for operations on messages in Dispatch Mode. For more information, see [Processing Modes](../../../../../conversation/processing-modes/). */
  'messages_source'?: MessageSource;
}
export interface ListMessagesRequestData {
  /** Resource name (ID) of the conversation. */
  'conversation_id'?: string;
  /** Resource name (ID) of the contact. */
  'contact_id'?: string;
  /** Id of the app. */
  'app_id'?: string;
  /** Channel identity of the contact. */
  'channel_identity'?: string;
  /** Filter messages with `accept_time` after this timestamp. Must be before `end_time` if that is specified. */
  'start_time'?: Date;
  /** Filter messages with `accept_time` before this timestamp. */
  'end_time'?: Date;
  /** Maximum number of messages to fetch. Defaults to 10 and the maximum is 1000. */
  'page_size'?: number;
  /** Next page token previously returned if any. When specifying this token, make sure to use the same values for the other parameters from the request that originated the token, otherwise the paged results may be inconsistent. */
  'page_token'?: string;
  /**  */
  'view'?: ConversationMessagesView;
  /** Specifies the message source for which the request will be processed. Used for operations on messages in Dispatch Mode. For more information, see [Processing Modes](../../../../../conversation/processing-modes/). */
  'messages_source'?: MessageSource;
  /** If true, fetch only recipient originated messages. Available only when `messages_source` is `DISPATCH_SOURCE`. */
  'only_recipient_originated'?: boolean;
  /** Only fetch messages from the `channel`. */
  'channel'?: ConversationChannel;
}
export interface SendMessageRequestData<T extends Recipient> {
  /** This is the request body for sending a message. `app_id`, `recipient`, and `message` are all required fields. */
  'sendMessageRequestBody': SendMessageRequest<T>;
}
export interface SendCardMessageRequestData<T extends Recipient> {
  /** This is the request body for sending a message. `app_id`, `recipient`, and `message` are all required fields. */
  'sendMessageRequestBody': SendCardMessageRequest<T>;
}
export interface SendCarouselMessageRequestData<T extends Recipient> {
  /** This is the request body for sending a message. `app_id`, `recipient`, and `message` are all required fields. */
  'sendMessageRequestBody': SendCarouselMessageRequest<T>;
}
export interface SendChoiceMessageRequestData<T extends Recipient> {
  /** This is the request body for sending a message. `app_id`, `recipient`, and `message` are all required fields. */
  'sendMessageRequestBody': SendChoiceMessageRequest<T>;
}
export interface SendContactInfoMessageRequestData<T extends Recipient> {
  /** This is the request body for sending a message. `app_id`, `recipient`, and `message` are all required fields. */
  'sendMessageRequestBody': SendContactInfoMessageRequest<T>;
}
export interface SendListMessageRequestData<T extends Recipient> {
  /** This is the request body for sending a message. `app_id`, `recipient`, and `message` are all required fields. */
  'sendMessageRequestBody': SendListMessageRequest<T>;
}
export interface SendLocationMessageRequestData<T extends Recipient> {
  /** This is the request body for sending a message. `app_id`, `recipient`, and `message` are all required fields. */
  'sendMessageRequestBody': SendLocationMessageRequest<T>;
}
export interface SendMediaMessageRequestData<T extends Recipient> {
  /** This is the request body for sending a message. `app_id`, `recipient`, and `message` are all required fields. */
  'sendMessageRequestBody': SendMediaMessageRequest<T>;
}
export interface SendTemplateMessageRequestData<T extends Recipient> {
  /** This is the request body for sending a message. `app_id`, `recipient`, and `message` are all required fields. */
  'sendMessageRequestBody': SendTemplateMessageRequest<T>;
}
export interface SendTextMessageRequestData<T extends Recipient> {
  /** This is the request body for sending a message. `app_id`, `recipient`, and `message` are all required fields. */
  'sendMessageRequestBody': SendTextMessageRequest<T>;
}
export interface UpdateMessageRequestData {
  /** The unique ID of the message. */
  'message_id': string;
  /** Update message metadata request. */
  'updateMessageRequestBody': UpdateMessageRequest;
  /** Specifies the message source for which the request will be processed. Used for operations on messages in Dispatch Mode. For more information, see [Processing Modes](../../../../../conversation/processing-modes/). */
  'messages_source'?: 'CONVERSATION_SOURCE' | 'DISPATCH_SOURCE';
}
