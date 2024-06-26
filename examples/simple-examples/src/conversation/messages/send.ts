import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('************************');
  console.log('* Messages_SendMessage *');
  console.log('************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: Conversation.SendMessageRequestData<Conversation.ContactId> = {
    sendMessageRequestBody: {
      app_id: appId,
      message: {
        text_message: {
          text: 'Text message from Sinch',
        },
      },
      recipient: {
        contact_id: contactId,
      },
      correlation_id: 'correlatorId',
      queue: 'HIGH_PRIORITY',
      processing_strategy: 'DEFAULT',
      channel_priority_order: ['MESSENGER'],
      ttl: 60,
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.messages.send(requestData);

  printFullResponse(response);

})();
