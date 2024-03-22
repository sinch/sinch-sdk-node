import { GetEventRequestData } from '@sinch/sdk-core';
import { getEventIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('*******************');
  console.log('* Events_GetEvent *');
  console.log('*******************');

  const eventId = getEventIdFromConfig();

  const requestData: GetEventRequestData = {
    event_id: eventId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.events.get(requestData);

  printFullResponse(response);

})();
