import { ContactId, SendComposingEventRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('********************');
  console.log('* Events_SendEvent *');
  console.log('********************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendComposingEventRequestData<ContactId> = {
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

  const sinchClient = initClient();
  const response = await sinchClient.conversation.events.sendComposingEvent(requestData);

  printFullResponse(response);

})();
