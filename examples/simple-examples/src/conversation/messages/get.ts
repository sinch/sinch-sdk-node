import { GetMessageRequestData } from '@sinch/sdk-core';
import { getMessageIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('***********************');
  console.log('* Messages_GetMessage *');
  console.log('***********************');

  const messageId = getMessageIdFromConfig();

  const requestData: GetMessageRequestData = {
    message_id: messageId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.messages.get(requestData);

  printFullResponse(response);

})();
