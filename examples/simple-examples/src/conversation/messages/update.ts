import { UpdateMessageRequestData } from '@sinch/sdk-core';
import {
  getMessageIdFromConfig,
  initClient,
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

  const sinchClient = initClient();
  const response = await sinchClient.conversation.messages.update(requestData);

  printFullResponse(response);

})();
