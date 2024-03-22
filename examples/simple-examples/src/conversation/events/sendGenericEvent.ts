import { ContactId, SendGenericEventRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('********************');
  console.log('* Events_SendEvent *');
  console.log('********************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendGenericEventRequestData<ContactId> = {
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

  const sinchClient = initClient();
  const response = await sinchClient.conversation.events.sendGenericEvent(requestData);

  printFullResponse(response);

})();
