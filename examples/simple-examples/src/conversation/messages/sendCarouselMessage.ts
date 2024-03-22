import { ContactId, SendCarouselMessageRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('********************************');
  console.log('* Messages_SendCarouselMessage *');
  console.log('********************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendCarouselMessageRequestData<ContactId> = {
    sendMessageRequestBody: {
      app_id: appId,
      message: {
        carousel_message: {
          cards: [
            {
              title: 'Card #1 title',
              description: 'Card #1 description',
              height: 'TALL',
            },
            {
              title: 'Card #2 title',
              description: 'Card #2 description',
              height: 'TALL',
            },
          ],
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
  const response = await conversationService.messages.sendCarouselMessage(requestData);

  printFullResponse(response);

})();
