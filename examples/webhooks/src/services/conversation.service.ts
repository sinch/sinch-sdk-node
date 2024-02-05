import { Injectable } from '@nestjs/common';
import {
  SinchClient,
  ConversationWebhookEventParsed,
  ContactMessage,
  MediaMessage,
  TextMessage,
  SendMessageRequestData,
} from '@sinch/sdk-core';

@Injectable()
export class ConversationService {

  private sinchClient: SinchClient;

  constructor() {
    this.sinchClient = this.initClient();
  }

  private initClient = () => {
    const keyId = process.env.SINCH_KEY_ID || '';
    const keySecret = process.env.SINCH_KEY_SECRET || '';
    const projectId = process.env.SINCH_PROJECT_ID || '';
    return new SinchClient({ projectId, keyId, keySecret });
  };

  private buildTextMessage(contactMessage: ContactMessage) {
    if ('text_message' in contactMessage) {
      return {
        text_message: {
          text: `Parrot mode 🦜: ${contactMessage.text_message.text}`,
        }
      } as TextMessage;
    }
    if ('media_message' in contactMessage) {
      return {
        media_message: {
          url: contactMessage.media_message.url,
        }
      } as MediaMessage;
    }
    if ('fallback_message' in contactMessage) {
      return {
        text_message: {
          text: `Error: ${contactMessage.fallback_message.reason.code} (${contactMessage.fallback_message.reason.sub_code})\n${contactMessage.fallback_message.reason.description}`
        }
      } as TextMessage
    }
  }

  handleEvent(event: ConversationWebhookEventParsed): void {
    switch (event.trigger) {
      case 'MESSAGE_INBOUND':
        console.log('\n## MESSAGE_INBOUND');
        const contactMessage = event.message.contact_message;
        const channelIdentityTo = event.message.channel_identity;
        console.log(`A new message has been received on the channel '${channelIdentityTo.channel}' (identity: ${channelIdentityTo.identity}) from the contact ID '${event.message.contact_id}':\n${JSON.stringify(contactMessage, null, 2)}`);
        const requestData: SendMessageRequestData = {
          sendMessageRequestBody: {
            app_id: event.app_id,
            recipient: {
              contact_id: event.message.contact_id,
            },
            message: this.buildTextMessage(contactMessage),
          },
        };
        this.sinchClient.conversation.messages.send(requestData)
          .then(response=> console.log(`Response successfully sent at '${response.accepted_time}': Message ID = ${response.message_id}`))
          .catch(error => console.error(`Impossible to send back a message to the user: ${error}`));
        break;
      case 'MESSAGE_INBOUND_SMART_CONVERSATION_REDACTION':
        console.log('\n## MESSAGE_INBOUND_SMART_CONVERSATION_REDACTION');
        if ('text_message' in event.message_redaction.contact_message) {
          console.log(`A.I. analyzed and redacted message:\n${event.message_redaction.contact_message.text_message.text}`);
        }
        break;
      case 'MESSAGE_SUBMIT':
        console.log('\n## MESSAGE_SUBMIT');
        const submittedMessage = event.message_submit_notification.submitted_message;
        const channelIdentityFrom = event.message_submit_notification.channel_identity;
        console.log(`The following message has been submitted on the channel '${channelIdentityFrom.channel}' (identity: ${channelIdentityFrom.identity}) to the contact ID '${event.message_submit_notification.contact_id}':\n${JSON.stringify(submittedMessage, null, 2)}`);
        break;
      case 'SMART_CONVERSATIONS':
        console.log('\n## SMART_CONVERSATIONS');
        const analysisResult = event.smart_conversation_notification.analysis_results;
        if (analysisResult.ml_sentiment_result) {
          console.log(`The sentiment of the message is '${analysisResult.ml_sentiment_result[0].sentiment}' with a score of ${analysisResult.ml_sentiment_result[0].score}`);
        }
        if (analysisResult.ml_nlu_result) {
          console.log(`The intent of the message is '${analysisResult.ml_nlu_result[0].intent}' with a score of ${analysisResult.ml_nlu_result[0].score}. Other intents are\n:${analysisResult.ml_nlu_result[0].results.map((result) => '- ' + result.intent + ': ' + result.score).join('\n')}`);
        }
        if (analysisResult.ml_pii_result) {
          console.log(`Message with masked PII:\n${analysisResult.ml_pii_result[0].masked}`);
        }
        if (analysisResult.ml_offensive_analysis_result) {
          console.log(`Message offensiveness evaluation: '${analysisResult.ml_offensive_analysis_result[0].evaluation}' with a score of ${analysisResult.ml_offensive_analysis_result[0].score}`);
        }
        if (analysisResult.ml_image_recognition_result) {
          console.log(`Image recognition results:\n${JSON.stringify(analysisResult.ml_image_recognition_result[0])}`);
        }
        break;
      case 'MESSAGE_DELIVERY':
        console.log('\n## MESSAGE_DELIVERY');
        const messageDeliveryStatus = event.message_delivery_report.status;
        console.log(`Message delivery status: '${messageDeliveryStatus}'`);
        if ('FAILED' === messageDeliveryStatus) {
          const failedDeliveryReason = event.message_delivery_report.reason;
          console.log(`Reason: ${failedDeliveryReason.code} (${failedDeliveryReason.sub_code})`);
          console.log(`Description: ${failedDeliveryReason.description}`);
        }
        break;
      case 'EVENT_INBOUND':
        console.log('\n## EVENT_INBOUND');
        if ('contact_event' in event.event) {
          console.log(`A new contact event has been received on the channel '${event.event.channel_identity.channel}' (${event.event.channel_identity.identity}) from the contact ID '${event.event.contact_id}'`);
        }
        if ('contact_message_event' in event.event) {
          const contactMessageEvent = event.event.contact_message_event;
          console.log(`A new contact message event has been received on the channel '${event.event.channel_identity.channel}' (${event.event.channel_identity.identity}) from the contact ID '${event.event.contact_id}'`);
          console.log(`Payment status: ${contactMessageEvent.payment_status_update_event.payment_status}`);
        }
        break;
      case 'EVENT_DELIVERY':
        console.log('\n## EVENT_DELIVERY');
        const eventDeliveryStatus = event.event_delivery_report.status;
        console.log(`Event delivery status: '${eventDeliveryStatus}'`);
        if ('FAILED' === eventDeliveryStatus) {
          const failedDeliveryReason = event.event_delivery_report.reason;
          console.log(`Reason: ${failedDeliveryReason.code} (${failedDeliveryReason.sub_code})`);
          console.log(`Description: ${failedDeliveryReason.description}`);
        }
        break;
      case 'CONVERSATION_START':
        console.log('\n## CONVERSATION_START');
        const conversationStart  = event.conversation_start_notification.conversation;
        console.log(`The conversation '${conversationStart.id}' has started on the channel ${conversationStart.active_channel}`);
        break;
      case 'CONVERSATION_STOP':
        console.log('\n## CONVERSATION_STOP');
        const conversationStop = event.conversation_stop_notification.conversation;
        console.log(`The conversation '${conversationStop.id}' has been stopped.\nThe last message was sent at '${conversationStop.last_received}' on the channel '${conversationStop.active_channel}'`);
        break;
      case 'CONVERSATION_DELETE':
        console.log('\n## CONVERSATION_DELETE');
        const conversationDelete  = event.conversation_delete_notification.conversation;
        console.log(`The conversation '${conversationDelete.id}' has been deleted.\nThe last message was sent at '${conversationDelete.last_received}' on the channel '${conversationDelete.active_channel}'`);
        break;
      case 'CONTACT_CREATE':
        console.log('\n## CONTACT_CREATE');
        console.log(`A new contact has been created: '${event.contact_create_notification.contact.display_name}'`);
        console.log(`List of channels:\n${event.contact_create_notification.contact.channel_identities.map((channelIdentity) => channelIdentity.channel).join('\n')}`);
        break;
      case 'CONTACT_DELETE':
        console.log('\n## CONTACT_DELETE');
        console.log(`A contact has been deleted: '${event.contact_delete_notification.contact.display_name}'`);
        break;
      case 'CONTACT_MERGE':
        console.log('\n## CONTACT_MERGE');
        const deletedContact = event.contact_merge_notification.deleted_contact;
        const preservedContact = event.contact_merge_notification.preserved_contact;
        console.log(`The contact ID '${deletedContact.id}' (${deletedContact.display_name}) has been merged into the contact ID '${preservedContact.id}' (${preservedContact.display_name})`);
        break;
      case 'CONTACT_UPDATE':
        console.log('\n## CONTACT_UPDATE');
        console.log(`A contact has been updated: '${event.contact_update_notification.contact.display_name}'`);
        break;
      case 'CONTACT_IDENTITIES_DUPLICATION':
        console.log('\n## CONTACT_IDENTITIES_DUPLICATION');
        const duplicatedEntities = event.duplicated_contact_identities_notification.duplicated_identities;
        for(const duplication of duplicatedEntities) {
          console.log(`The channel ${duplication.channel} contains the following duplicated contact IDs: ${duplication.contact_ids.join(', ')}`);
        }
        break;
      case 'CAPABILITY':
        console.log('\n## CAPABILITY');
        const capabilityNotification = event.capability_notification;
        console.log(`Capability for the contact ID '${capabilityNotification.contact_id}':`)
        console.log(`Channel: '${capabilityNotification.channel}' - Identity: ${capabilityNotification.identity}`);
        if ('reason' in event.capability_notification) {
          const capabilityUnknownReason = event.capability_notification.reason;
          console.log(`Reason: ${capabilityUnknownReason.code} (${capabilityUnknownReason.sub_code})`);
          console.log(`Description: ${capabilityUnknownReason.description}`);
        }
        break;
      case 'OPT_IN':
        console.log('\n## OPT_IN')
        const optIn = event.opt_in_notification;
        console.log(`Status of the opt-in registration for the identity '${optIn.identity}' on the channel '${optIn.channel}': '${optIn.status}'`);
        break;
      case 'OPT_OUT':
        console.log('\n## OPT_OUT')
        const optOut = event.opt_out_notification;
        console.log(`Status of the opt-out registration for the identity '${optOut.identity}' on the channel '${optOut.channel}': '${optOut.status}'`);
        break;
      case 'CHANNEL_EVENT':
        console.log('\n## CHANNEL_EVENT')
        const channelEvent = event.channel_event_notification;
        console.log(`The event '${channelEvent.event_type}' occurred on the channel '${channelEvent.channel}'.`);
        if ('additional_data' in channelEvent) {
          console.log(`Additional data:\n${JSON.stringify(channelEvent.additional_data, null, 2)}`);
        }
        break;
      case 'UNSUPPORTED':
        console.log('\n## UNSUPPORTED')
        const unsupportedCallback = event.unsupported_callback;
        console.log(`The channel ${unsupportedCallback.channel} has received an unsupported payload:\n${unsupportedCallback.payload}`);
        break;
      default:
        console.log('\n## Unknown event: the following event is unknown or not handled');
        console.log(JSON.stringify(event, null, 2));
    }
  }
}
