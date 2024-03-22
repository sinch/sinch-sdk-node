import { UpdateMessageRequestData } from '@sinch/sdk-core';
import {
  getMessageIdFromConfig,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**************************');
  console.log('* Messages_UpdateMessage *');
  console.log('**************************');

  const messageId = getMessageIdFromConfig();

  const requestData: UpdateMessageRequestData = {
    message_id: messageId,
    updateMessageRequestBody: {
      metadata: 'Updated metadata',
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.messages.update(requestData);

  printFullResponse(response);

})();
