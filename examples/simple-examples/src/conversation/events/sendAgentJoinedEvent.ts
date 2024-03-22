import { ContactId, SendAgentJoinedEventRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('********************');
  console.log('* Events_SendEvent *');
  console.log('********************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendAgentJoinedEventRequestData<ContactId> = {
    sendEventRequestBody: {
      app_id: appId,
      recipient: {
        contact_id: contactId,
      },
      event: {
        agent_joined_event: {
          agent: {
            display_name: 'Agent bot name',
            type: 'BOT',
          },
        },
      },
    },
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.events.sendAgentJoinedEvent(requestData);

  printFullResponse(response);

})();
