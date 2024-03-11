import { ContactId, SendCardMessageRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('****************************');
  console.log('* Messages_SendCardMessage *');
  console.log('****************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendCardMessageRequestData<ContactId> = {
    sendMessageRequestBody: {
      app_id: appId,
      message: {
        card_message: {
          title: 'Card message title',
          description: 'Card message description',
          height: 'MEDIUM',
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

  const sinchClient = initClient();
  const response = await sinchClient.conversation.messages.sendCardMessage(requestData);

  printFullResponse(response);

})();
