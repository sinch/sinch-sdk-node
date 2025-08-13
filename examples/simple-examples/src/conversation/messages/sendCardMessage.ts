import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('****************************');
  console.log('* Messages_SendCardMessage *');
  console.log('****************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: Conversation.SendCardMessageRequestData<Conversation.ContactId> = {
    sendMessageRequestBody: {
      app_id: appId,
      message: {
        card_message: {
          title: 'Card message title',
          description: 'Card message description',
          height: 'MEDIUM',
          media_message: {
            url: 'https://example.com/follow-the-white-rabbit.mpeg',
            thumbnail_url: 'https://example.com/follow-the-white-rabbit.jpg',
            filename_override: 'red-pill-or-blue-pill.jpg',
          },
        },
      },
      recipient: {
        contact_id: contactId,
      },
      correlation_id: 'correlatorId',
      queue: 'HIGH_PRIORITY',
      processing_strategy: 'DEFAULT',
      channel_priority_order: ['MESSENGER'],
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.messages.sendCardMessage(requestData);

  printFullResponse(response);

})();
