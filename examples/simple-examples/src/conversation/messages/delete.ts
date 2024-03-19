import { DeleteMessageRequestData } from '@sinch/sdk-core';
import { getMessageIdFromConfig, initConversationService, printFullResponse } from '../../config';


(async () => {
  console.log('**************************');
  console.log('* Messages_DeleteMessage *');
  console.log('**************************');

  const messageId = getMessageIdFromConfig();

  const requestData: DeleteMessageRequestData = {
    message_id: messageId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.messages.delete(requestData);

  printFullResponse(response);

})();
