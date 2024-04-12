import { Recipient } from '../../recipient';
import {
  SendAgentJoinedEventRequest, SendAgentLeftEventRequest,
  SendCommentReplyEventRequest,
  SendComposingEndEventRequest,
  SendComposingEventRequest,
  SendEventRequest, SendGenericEventRequest,
} from '../../send-event-request';

export interface DeleteEventRequestData {
  /** The unique ID of the event. */
  'event_id': string;
}
export interface GetEventRequestData {
  /** The unique ID of the event. */
  'event_id': string;
}
export interface ListEventsRequestData {
  /** Resource name (id) of the conversation. One of conversation_id or contact_id needs to be present. */
  'conversation_id'?: string;
  /** Resource name (id) of the contact. One of conversation_id or contact_id needs to be present. */
  'contact_id'?: string;
  /** Maximum number of events to fetch. Defaults to 10 and the maximum is 20. */
  'page_size'?: number;
  /** Next page token previously returned if any. When specifying this token, make sure to use the same values
   * for the other parameters from the request that originated the token, otherwise the paged results may be inconsistent. */
  'page_token'?: string;
}
export interface SendEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendEventRequest<T>;
}
export interface SendComposingEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendComposingEventRequest<T>;
}
export interface SendComposingEndEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendComposingEndEventRequest<T>;
}
export interface SendCommentReplyEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendCommentReplyEventRequest<T>;
}
export interface SendAgentJoinedEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendAgentJoinedEventRequest<T>;
}
export interface SendAgentLeftEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendAgentLeftEventRequest<T>;
}
export interface SendGenericEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendGenericEventRequest<T>;
}
