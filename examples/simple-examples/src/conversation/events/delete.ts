import { DeleteEventRequestData } from '@sinch/sdk-core';
import { getEventIdFromConfig, initClient, printFullResponse } from '../../config';


(async () => {
  console.log('**********************');
  console.log('* Events_DeleteEvent *');
  console.log('**********************');

  const eventId = getEventIdFromConfig();

  const requestData: DeleteEventRequestData = {
    event_id: eventId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.events.delete(requestData);

  printFullResponse(response);

})();
