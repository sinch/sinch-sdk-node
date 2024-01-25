import { SendMessageRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('************************');
  console.log('* Messages_SendMessage *');
  console.log('************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendMessageRequestData = {
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
      correlation_id: 'correlator',
      queue: 'HIGH_PRIORITY',
      processing_strategy: 'DEFAULT',
      channel_priority_order: ['MESSENGER'],
    },
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.messages.send(requestData);

  printFullResponse(response);

})();
