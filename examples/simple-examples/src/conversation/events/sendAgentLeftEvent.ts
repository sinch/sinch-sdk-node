import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('********************');
  console.log('* Events_SendEvent *');
  console.log('********************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: Conversation.SendAgentLeftEventRequestData<Conversation.ContactId> = {
    sendEventRequestBody: {
      app_id: appId,
      recipient: {
        contact_id: contactId,
      },
      event: {
        agent_left_event: {
          agent: {
            display_name: 'Agent bot name',
            type: 'BOT',
          },
        },
      },
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.events.sendAgentLeftEvent(requestData);

  printFullResponse(response);

})();
