import { DeleteEventRequestData } from '@sinch/sdk-core';
import { getEventIdFromConfig, initConversationService, printFullResponse } from '../../config';


(async () => {
  console.log('**********************');
  console.log('* Events_DeleteEvent *');
  console.log('**********************');

  const eventId = getEventIdFromConfig();

  const requestData: DeleteEventRequestData = {
    event_id: eventId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.events.delete(requestData);

  printFullResponse(response);

})();
