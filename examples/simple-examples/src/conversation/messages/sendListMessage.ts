import { ContactId, SendListMessageRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('****************************');
  console.log('* Messages_SendListMessage *');
  console.log('****************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendListMessageRequestData<ContactId> = {
    sendMessageRequestBody: {
      app_id: appId,
      message: {
        list_message: {
          title: 'List message title',
          description: 'List message description',
          sections: [
            {
              title: 'Section #1',
              items: [
                {
                  choice: {
                    title: 'Choice 1.1',
                    description: 'Description for choice 1.1',
                    postback_data: '1.1',
                  },
                },
              ],
            },
            {
              title: 'Section #2',
              items: [
                {
                  choice: {
                    title: 'Choice 2.1',
                    description: 'Description for choice 2.1',
                    postback_data: '2.1',
                  },
                },
              ],
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
  const response = await conversationService.messages.sendListMessage(requestData);

  printFullResponse(response);

})();
