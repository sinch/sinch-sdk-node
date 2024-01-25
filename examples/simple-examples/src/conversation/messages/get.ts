import { GetMessageRequestData } from '@sinch/sdk-core';
import { getMessageIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('***********************');
  console.log('* Messages_GetMessage *');
  console.log('***********************');

  const messageId = getMessageIdFromConfig();

  const requestData: GetMessageRequestData = {
    message_id: messageId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.messages.get(requestData);

  printFullResponse(response);

})();
