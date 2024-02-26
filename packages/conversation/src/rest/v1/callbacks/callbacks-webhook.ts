import {
  CapabilityEvent, ChannelEvent,
  ContactCreateEvent,
  ContactDeleteEvent,
  ContactIdentitiesDuplicationEvent,
  ContactMergeEvent,
  ContactUpdateEvent,
  ConversationDeleteEvent,
  ConversationStartEvent,
  ConversationStopEvent,
  ConversationWebhookEvent,
  EventDelivery,
  EventInbound,
  MessageDeliveryReceiptEvent,
  MessageInboundEvent,
  MessageInboundSmartConversationRedactionEvent,
  MessageSubmitEvent,
  OptInEvent,
  OptOutEvent,
  RecordNotificationEvent,
  SmartConversationsEvent,
  UnsupportedCallbackEvent,
  WebhookTrigger,
} from '../../../models';
import { CallbackProcessor, validateWebhookSignature } from '@sinch/sdk-client';
import { IncomingHttpHeaders } from 'http';

interface WebhookTriggerEvent {
  trigger: WebhookTrigger;
}
export type ConversationWebhookEventParsed = ConversationWebhookEvent & WebhookTriggerEvent;

export class ConversationCallbackWebhooks implements CallbackProcessor<ConversationWebhookEventParsed> {
  private readonly appSecret: string;

  constructor(appSecret: string) {
    this.appSecret = appSecret;
  }

  /**
   * Validate authorization header for callback request
   * @param {IncomingHttpHeaders} headers - Incoming request's headers
   * @param {any} body - Incoming request's body
   * @param {string} _path - Incoming request's path
   * @param {string} _method - Incoming request's HTTP method
   * @return {boolean} - true if the X-Sinch-Signature header is valid
   */
  public validateAuthenticationHeader(
    headers: IncomingHttpHeaders,
    body: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _path?: string, _method?: string,
  ): boolean {
    return validateWebhookSignature(
      this.appSecret,
      headers,
      body,
    );
  }

  /**
   * Add the trigger corresponding to the trigger
   * 'message' <==> MESSAGE_INBOUND
   * 'message_redaction' <==> MESSAGE_INBOUND_SMART_CONVERSATION_REDACTION
   * 'message_submit_notification' <==> MESSAGE_SUBMIT
   * 'message_delivery_report' <==> MESSAGE_DELIVERY
   * 'event' <==> EVENT_INBOUND
   * 'event_delivery_report' <==> EVENT_DELIVERY
   * 'conversation_start_notification' <==> CONVERSATION_START
   * 'conversation_stop_notification' <==> CONVERSATION_STOP
   * 'conversation_delete_notification' <==> CONVERSATION_DELETE
   * 'contact_create_notification' <==> CONTACT_CREATE
   * 'contact_delete_notification' <==> CONTACT_DELETE
   * 'contact_merge_notification' <==> CONTACT_MERGE
   * 'contact_update_notification' <==> CONTACT_UPDATE
   * 'duplicated_identities' <==> CONTACT_IDENTITIES_DUPLICATION
   * 'capability_notification' <==> CAPABILITY
   * 'opt_in_notification' <==> OPT_IN
   * 'opt_out_notification' <==> OPT_OUT
   * 'channel_event_notification' <==> CHANNEL_EVENT
   * 'unsupported_callback' <==> UNSUPPORTED
   * 'smart_conversation_notification' <==> SMART_CONVERSATIONS
   *
   * @param {any} eventBody - The conversation event to parse
   * @return {ConversationWebhookEventParsed} - Parsed conversation event.
   * @throws {Error} If the eventBody is not valid or cannot be parsed.
   */
  public parseEvent(eventBody: any): ConversationWebhookEventParsed {
    if ('message' in eventBody) {
      return {
        ...eventBody,
        trigger: 'MESSAGE_INBOUND',
      } as MessageInboundEvent;
    } else if ('message_redaction' in eventBody) {
      return {
        ...eventBody,
        trigger: 'MESSAGE_INBOUND_SMART_CONVERSATION_REDACTION',
      } as MessageInboundSmartConversationRedactionEvent;
    } else if ('message_submit_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'MESSAGE_SUBMIT',
      } as MessageSubmitEvent;
    } else if ('message_delivery_report' in eventBody) {
      return {
        ...eventBody,
        trigger: 'MESSAGE_DELIVERY',
      } as MessageDeliveryReceiptEvent;
    } else if ('event' in eventBody) {
      return {
        ...eventBody,
        trigger: 'EVENT_INBOUND',
      } as EventInbound;
    } else if ('event_delivery_report' in eventBody) {
      return {
        ...eventBody,
        trigger: 'EVENT_DELIVERY',
      } as EventDelivery;
    } else if ('conversation_start_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'CONVERSATION_START',
      } as ConversationStartEvent;
    } else if ('conversation_stop_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'CONVERSATION_STOP',
      } as ConversationStopEvent;
    } else if ('conversation_delete_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'CONVERSATION_DELETE',
      } as ConversationDeleteEvent;
    } else if ('contact_create_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'CONTACT_CREATE',
      } as ContactCreateEvent;
    } else if ('contact_delete_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'CONTACT_DELETE',
      } as ContactDeleteEvent;
    } else if ('contact_merge_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'CONTACT_MERGE',
      } as ContactMergeEvent;
    } else if ('contact_update_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'CONTACT_UPDATE',
      } as ContactUpdateEvent;
    } else if ('duplicated_identities' in eventBody) {
      return {
        ...eventBody,
        trigger: 'CONTACT_IDENTITIES_DUPLICATION',
      } as ContactIdentitiesDuplicationEvent;
    } else if ('capability_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'CAPABILITY',
      } as CapabilityEvent;
    } else if ('opt_in_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'OPT_IN',
      } as OptInEvent;
    } else if ('opt_out_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'OPT_OUT',
      } as OptOutEvent;
    } else if ('channel_event_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'CHANNEL_EVENT',
      } as ChannelEvent;
    } else if ('unsupported_callback' in eventBody) {
      return {
        ...eventBody,
        trigger: 'UNSUPPORTED',
      } as UnsupportedCallbackEvent;
    } else if ('smart_conversation_notification' in eventBody) {
      return {
        ...eventBody,
        trigger: 'SMART_CONVERSATIONS',
      } as SmartConversationsEvent;
    } else if ('record_notification' in eventBody) { // TBC: need confirmation about the property name
      return {
        ...eventBody,
        trigger: 'RECORD_NOTIFICATION',
      } as RecordNotificationEvent;
    } else {
      throw new Error('Unknown Conversation event to parse');
    }
  };
}
