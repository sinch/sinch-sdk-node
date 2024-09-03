import { Given, Then, When } from '@cucumber/cucumber';
import { ConversationCallbackWebhooks, Conversation } from '../../../../src';
import assert from 'assert';
import { IncomingHttpHeaders } from 'http';

const APP_SECRET = 'CactusKnight_SurfsWaves';
let conversationCallbackWebhook: ConversationCallbackWebhooks;
let rawEvent: any;
let event: Conversation.ConversationWebhookEvent;
let formattedHeaders: IncomingHttpHeaders;

const processEvent = async (response: Response) => {
  formattedHeaders = {};
  response.headers.forEach((value, name) => {
    formattedHeaders[name.toLowerCase()] = value;
  });
  rawEvent = await response.text();
  event = conversationCallbackWebhook.parseEvent(JSON.parse(rawEvent));
};

Given('the Conversation Webhooks handler is available', () => {
  conversationCallbackWebhook = new ConversationCallbackWebhooks(APP_SECRET);
});

When('I send a request to trigger a "CAPABILITY" event', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/capability-lookup');
  await processEvent(response);
});

Then('the header of the Conversation event "CAPABILITY" contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "CAPABILITY" event type', () => {
  const capabilityEvent = event as Conversation.CapabilityEvent;
  assert.ok(capabilityEvent.capability_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'CAPABILITY';
  assert.equal(capabilityEvent.trigger, expectedTrigger);
});

When('I send a request to trigger a "CONTACT_CREATE" event', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/contact-create');
  await processEvent(response);
});

Then('the header of the Conversation event "CONTACT_CREATE" contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "CONTACT_CREATE" event type', () => {
  const contactCreateEvent = event as Conversation.ContactCreateEvent;
  assert.ok(contactCreateEvent.contact_create_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'CONTACT_CREATE';
  assert.equal(contactCreateEvent.trigger, expectedTrigger);
});

When('I send a request to trigger a "CONTACT_DELETE" event', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/contact-delete');
  await processEvent(response);
});

Then('the header of the Conversation event "CONTACT_DELETE" contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "CONTACT_DELETE" event type', () => {
  const contactDeleteEvent = event as Conversation.ContactDeleteEvent;
  assert.ok(contactDeleteEvent.contact_delete_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'CONTACT_DELETE';
  assert.equal(contactDeleteEvent.trigger, expectedTrigger);
});

When('I send a request to trigger a "CONTACT_MERGE" event', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/contact-merge');
  await processEvent(response);
});

Then('the header of the Conversation event "CONTACT_MERGE" contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "CONTACT_MERGE" event type', () => {
  const contactMergeEvent = event as Conversation.ContactMergeEvent;
  assert.ok(contactMergeEvent.contact_merge_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'CONTACT_MERGE';
  assert.equal(contactMergeEvent.trigger, expectedTrigger);
});

When('I send a request to trigger a "CONTACT_UPDATE" event', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/contact-update');
  await processEvent(response);
});

Then('the header of the Conversation event "CONTACT_UPDATE" contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "CONTACT_UPDATE" event type', () => {
  const contactUpdateEvent = event as Conversation.ContactUpdateEvent;
  assert.ok(contactUpdateEvent.contact_update_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'CONTACT_UPDATE';
  assert.equal(contactUpdateEvent.trigger, expectedTrigger);
});

When('I send a request to trigger a "CONVERSATION_DELETE" event', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/conversation-delete');
  await processEvent(response);
});

Then('the header of the Conversation event "CONVERSATION_DELETE" contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "CONVERSATION_DELETE" event type', () => {
  const conversationDeleteEvent = event as Conversation.ConversationDeleteEvent;
  assert.ok(conversationDeleteEvent.conversation_delete_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'CONVERSATION_DELETE';
  assert.equal(conversationDeleteEvent.trigger, expectedTrigger);
});

When('I send a request to trigger a "CONVERSATION_START" event', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/conversation-start');
  await processEvent(response);
});

Then('the header of the Conversation event "CONVERSATION_START" contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "CONVERSATION_START" event type', () => {
  const conversationStartEvent = event as Conversation.ConversationStartEvent;
  assert.ok(conversationStartEvent.conversation_start_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'CONVERSATION_START';
  assert.equal(conversationStartEvent.trigger, expectedTrigger);
});

When('I send a request to trigger a "CONVERSATION_STOP" event', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/conversation-stop');
  await processEvent(response);
});

Then('the header of the Conversation event "CONVERSATION_STOP" contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "CONVERSATION_STOP" event type', () => {
  const conversationStopEvent = event as Conversation.ConversationStopEvent;
  assert.ok(conversationStopEvent.conversation_stop_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'CONVERSATION_STOP';
  assert.equal(conversationStopEvent.trigger, expectedTrigger);
});

When('I send a request to trigger a "EVENT_DELIVERY" event with a "FAILED" status', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/event-delivery-report/failed');
  await processEvent(response);
});

Then('the header of the Conversation event "EVENT_DELIVERY" with a "FAILED" status contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "EVENT_DELIVERY" event type', () => {
  const eventDeliveryEvent = event as Conversation.EventDelivery;
  assert.ok(eventDeliveryEvent.event_delivery_report);
  const expectedTrigger: Conversation.WebhookTrigger = 'EVENT_DELIVERY';
  assert.equal(eventDeliveryEvent.trigger, expectedTrigger);
});

Then('the Conversation event describes a FAILED event delivery status and its reason', () => {
  const eventDeliveryReport = (event as Conversation.EventDelivery).event_delivery_report!;
  const expectedStatus: Conversation.DeliveryStatus = 'FAILED';
  assert.equal(eventDeliveryReport.status, expectedStatus);
  assert.ok(eventDeliveryReport.reason);
  const expectedReasonCode: Conversation.ReasonCode = 'BAD_REQUEST';
  assert.equal(eventDeliveryReport.reason.code, expectedReasonCode);
});

When('I send a request to trigger a "EVENT_DELIVERY" event with a "DELIVERED" status', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/event-delivery-report/succeeded');
  await processEvent(response);
});

// eslint-disable-next-line max-len
Then('the header of the Conversation event "EVENT_DELIVERY" with a "DELIVERED" status contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

When('I send a request to trigger a "EVENT_INBOUND" event', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/event-inbound');
  await processEvent(response);
});

Then('the header of the Conversation event "EVENT_INBOUND" contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "EVENT_INBOUND" event type', () => {
  const eventInbound = event as Conversation.EventInbound;
  assert.ok(eventInbound.event);
  const expectedTrigger: Conversation.WebhookTrigger = 'EVENT_INBOUND';
  assert.equal(eventInbound.trigger, expectedTrigger);
});

When('I send a request to trigger a "MESSAGE_DELIVERY" event with a "FAILED" status', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/message-delivery-report/failed');
  await processEvent(response);
});

// eslint-disable-next-line max-len
Then('the header of the Conversation event "MESSAGE_DELIVERY" with a "FAILED" status contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

When('I send a request to trigger a "MESSAGE_DELIVERY" event with a "QUEUED" status', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/message-delivery-report/succeeded');
  await processEvent(response);
});

// eslint-disable-next-line max-len
Then('the header of the Conversation event "MESSAGE_DELIVERY" with a "QUEUED" status contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "MESSAGE_DELIVERY" event type', () => {
  const messageDeliveryReceiptEvent = event as Conversation.MessageDeliveryReceiptEvent;
  assert.ok(messageDeliveryReceiptEvent.message_delivery_report);
  const expectedTrigger: Conversation.WebhookTrigger = 'MESSAGE_DELIVERY';
  assert.equal(messageDeliveryReceiptEvent.trigger, expectedTrigger);
});

Then('the Conversation event describes a FAILED message delivery status and its reason', () => {
  const messageDeliveryReport = (event as Conversation.MessageDeliveryReceiptEvent).message_delivery_report!;
  const expectedStatus: Conversation.DeliveryStatus = 'FAILED';
  assert.equal(messageDeliveryReport.status, expectedStatus);
  assert.ok(messageDeliveryReport.reason);
  const expectedReasonCode: Conversation.ReasonCode = 'RECIPIENT_NOT_REACHABLE';
  assert.equal(messageDeliveryReport.reason.code, expectedReasonCode);
});

When('I send a request to trigger a "MESSAGE_INBOUND" event', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/message-inbound');
  await processEvent(response);
});

Then('the header of the Conversation event "MESSAGE_INBOUND" contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "MESSAGE_INBOUND" event type', () => {
  const messageInboundEvent = event as Conversation.MessageInboundEvent;
  assert.ok(messageInboundEvent.message);
  const expectedTrigger: Conversation.WebhookTrigger = 'MESSAGE_INBOUND';
  assert.equal(messageInboundEvent.trigger, expectedTrigger);
});

When('I send a request to trigger a "MESSAGE_INBOUND_SMART_CONVERSATION_REDACTION" event', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/message-inbound/smart-conversation-redaction');
  await processEvent(response);
});

// eslint-disable-next-line max-len
Then('the header of the Conversation event "MESSAGE_INBOUND_SMART_CONVERSATION_REDACTION" contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "MESSAGE_INBOUND_SMART_CONVERSATION_REDACTION" event type', () => {
  const messageInboundSmartConversationRedactionEvent
    = event as Conversation.MessageInboundSmartConversationRedactionEvent;
  assert.ok(messageInboundSmartConversationRedactionEvent.message_redaction);
  const expectedTrigger: Conversation.WebhookTrigger = 'MESSAGE_INBOUND_SMART_CONVERSATION_REDACTION';
  assert.equal(messageInboundSmartConversationRedactionEvent.trigger, expectedTrigger);
});

When('I send a request to trigger a "MESSAGE_SUBMIT" event for a media message', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/message-submit/media');
  await processEvent(response);
});

Then('the header of the Conversation event "MESSAGE_SUBMIT" for a media message contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "MESSAGE_SUBMIT" event type for a media message', () => {
  const messageSubmitEvent = event as Conversation.MessageSubmitEvent;
  assert.ok(messageSubmitEvent.message_submit_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'MESSAGE_SUBMIT';
  assert.equal(messageSubmitEvent.trigger, expectedTrigger);
  assert.ok(messageSubmitEvent.message_submit_notification.submitted_message?.media_message);
});

When('I send a request to trigger a "MESSAGE_SUBMIT" event for a text message', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/message-submit/text');
  await processEvent(response);
});

Then('the header of the Conversation event "MESSAGE_SUBMIT" for a text message contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "MESSAGE_SUBMIT" event type for a text message', () => {
  const messageSubmitEvent = event as Conversation.MessageSubmitEvent;
  assert.ok(messageSubmitEvent.message_submit_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'MESSAGE_SUBMIT';
  assert.equal(messageSubmitEvent.trigger, expectedTrigger);
  assert.ok(messageSubmitEvent.message_submit_notification.submitted_message?.text_message);
});

When('I send a request to trigger a "SMART_CONVERSATIONS" event for a media message', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/smart-conversation/media');
  await processEvent(response);
});

// eslint-disable-next-line max-len
Then('the header of the Conversation event "SMART_CONVERSATIONS" for a media message contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "SMART_CONVERSATIONS" event type for a media message', () => {
  const smartConversationsEvent = event as Conversation.SmartConversationsEvent;
  assert.ok(smartConversationsEvent.smart_conversation_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'SMART_CONVERSATIONS';
  assert.equal(smartConversationsEvent.trigger, expectedTrigger);
  assert.ok(smartConversationsEvent.smart_conversation_notification.analysis_results?.ml_image_recognition_result);
  assert.ok(smartConversationsEvent.smart_conversation_notification.analysis_results?.ml_offensive_analysis_result);
});

When('I send a request to trigger a "SMART_CONVERSATIONS" event for a text message', async () => {
  const response = await fetch('http://localhost:3014/webhooks/conversation/smart-conversation/text');
  await processEvent(response);
});

Then('the header of the Conversation event "SMART_CONVERSATIONS" for a text message contains a valid signature', () => {
  assert.ok(conversationCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the Conversation event describes a "SMART_CONVERSATIONS" event type for a text message', () => {
  const smartConversationsEvent = event as Conversation.SmartConversationsEvent;
  assert.ok(smartConversationsEvent.smart_conversation_notification);
  const expectedTrigger: Conversation.WebhookTrigger = 'SMART_CONVERSATIONS';
  assert.equal(smartConversationsEvent.trigger, expectedTrigger);
  assert.ok(smartConversationsEvent.smart_conversation_notification.analysis_results?.ml_sentiment_result);
  assert.ok(smartConversationsEvent.smart_conversation_notification.analysis_results?.ml_nlu_result);
  assert.ok(smartConversationsEvent.smart_conversation_notification.analysis_results?.ml_pii_result);
  assert.ok(smartConversationsEvent.smart_conversation_notification.analysis_results?.ml_offensive_analysis_result);
});
