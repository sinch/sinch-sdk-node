import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('********************');
  console.log('* Events_SendEvent *');
  console.log('********************');

  const appId = getAppIdFromConfig();

  // Only supports WhatsApp channel, so we need to use the WhatsApp contact ID
  const whatsAppContactId = getContactIdFromConfig();

  const requestData: Conversation.SendReadMessageEventRequestData<Conversation.ContactId> = {
    sendEventRequestBody: {
      app_id: appId,
      recipient: {
        contact_id: whatsAppContactId,
      },
      event: {
        read_message_event: {},
      },
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.events.sendReadMessageEvent(requestData);

  printFullResponse(response);

})();
