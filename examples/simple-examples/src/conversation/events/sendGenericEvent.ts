import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('********************');
  console.log('* Events_SendEvent *');
  console.log('********************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: Conversation.SendGenericEventRequestData<Conversation.ContactId> = {
    sendEventRequestBody: {
      app_id: appId,
      recipient: {
        contact_id: contactId,
      },
      event: {
        generic_event: {
          payload: {
            key: 'value for the generic event',
          },
        },
      },
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.events.sendGenericEvent(requestData);

  printFullResponse(response);

})();
