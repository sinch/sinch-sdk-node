import { DeleteMessageRequestData } from '@sinch/sdk-core';
import { getMessageIdFromConfig, initClient, printFullResponse } from '../../config';


(async () => {
  console.log('**************************');
  console.log('* Messages_DeleteMessage *');
  console.log('**************************');

  const messageId = getMessageIdFromConfig();

  const requestData: DeleteMessageRequestData = {
    message_id: messageId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.messages.delete(requestData);

  printFullResponse(response);

})();
