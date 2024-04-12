import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('********************');
  console.log('* Events_SendEvent *');
  console.log('********************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: Conversation.SendComposingEventRequestData<Conversation.ContactId> = {
    sendEventRequestBody: {
      app_id: appId,
      recipient: {
        contact_id: contactId,
      },
      event: {
        composing_event: {},
      },
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.events.sendComposingEvent(requestData);

  printFullResponse(response);

})();
