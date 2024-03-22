import { ContactId, SendMediaMessageRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('*****************************');
  console.log('* Messages_SendMediaMessage *');
  console.log('*****************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendMediaMessageRequestData<ContactId> = {
    sendMessageRequestBody: {
      app_id: appId,
      message: {
        media_message: {
          url: 'https://media.url',
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
  const response = await sinchClient.conversation.messages.sendMediaMessage(requestData);

  printFullResponse(response);

})();
