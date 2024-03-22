import { ContactId, SendTextMessageRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('****************************');
  console.log('* Messages_SendTextMessage *');
  console.log('****************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendTextMessageRequestData<ContactId> = {
    sendMessageRequestBody: {
      app_id: appId,
      message: {
        text_message: {
          text: 'Text message',
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
  const response = await conversationService.messages.sendTextMessage(requestData);

  printFullResponse(response);

})();
