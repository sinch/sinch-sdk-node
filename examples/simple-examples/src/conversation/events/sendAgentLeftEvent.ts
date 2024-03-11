import { ContactId, SendAgentLeftEventRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('********************');
  console.log('* Events_SendEvent *');
  console.log('********************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendAgentLeftEventRequestData<ContactId> = {
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

  const sinchClient = initClient();
  const response = await sinchClient.conversation.events.sendAgentLeftEvent(requestData);

  printFullResponse(response);

})();
