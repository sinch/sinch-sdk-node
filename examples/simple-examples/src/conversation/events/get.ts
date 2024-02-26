import { GetEventRequestData } from '@sinch/sdk-core';
import { getEventIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('*******************');
  console.log('* Events_GetEvent *');
  console.log('*******************');

  const eventId = getEventIdFromConfig();

  const requestData: GetEventRequestData = {
    event_id: eventId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.events.get(requestData);

  printFullResponse(response);

})();
