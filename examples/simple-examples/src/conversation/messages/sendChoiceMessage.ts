import { ContactId, SendChoiceMessageRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('******************************');
  console.log('* Messages_SendChoiceMessage *');
  console.log('******************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendChoiceMessageRequestData<ContactId> = {
    sendMessageRequestBody: {
      app_id: appId,
      message: {
        choice_message: {
          text_message: {
            text: 'Make your choice',
          },
          choices: [
            {
              call_message: {
                title: 'Option #1',
                phone_number: '+1111111111',
              },
            },
            {
              call_message: {
                title: 'Option #2',
                phone_number: '+2222222222',
              },
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
  const response = await conversationService.messages.sendChoiceMessage(requestData);

  printFullResponse(response);

})();
