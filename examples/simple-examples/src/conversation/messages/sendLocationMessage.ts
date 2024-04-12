import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('********************************');
  console.log('* Messages_SendLocationMessage *');
  console.log('********************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: Conversation.SendLocationMessageRequestData<Conversation.ContactId> = {
    sendMessageRequestBody: {
      app_id: appId,
      message: {
        location_message: {
          title: 'Phare d\'Eckmühl',
          label: 'Pointe de Penmarch',
          coordinates: {
            latitude: 47.7981899,
            longitude: -4.3727685,
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
  const response = await conversationService.messages.sendLocationMessage(requestData);

  printFullResponse(response);

})();
