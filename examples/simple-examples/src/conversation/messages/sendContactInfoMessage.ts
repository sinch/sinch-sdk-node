import { ContactId, SendContactInfoMessageRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('***********************************');
  console.log('* Messages_SendContactInfoMessage *');
  console.log('***********************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendContactInfoMessageRequestData<ContactId> = {
    sendMessageRequestBody: {
      app_id: appId,
      message: {
        contact_info_message: {
          name: {
            full_name: 'Contact name',
          },
          phone_numbers: [
            {
              phone_number: '+111111111',
              type: 'HOME',
            },
          ],
          organization: {
            title: 'Software developer',
            company: 'Sinch',
            department: 'Developer Experience',
          },
          birthday: '1990-01-01',
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
  const response = await sinchClient.conversation.messages.sendContactInfoMessage(requestData);

  printFullResponse(response);

})();
