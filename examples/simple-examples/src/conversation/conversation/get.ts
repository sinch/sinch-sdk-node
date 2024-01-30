import { GetConversationRequestData } from '@sinch/sdk-core';
import {
  getConversationIdFromConfig,
  getPrintFormat,
  initClient,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('********************************');
  console.log('* Conversation_GetConversation *');
  console.log('********************************');

  const conversationId = getConversationIdFromConfig();

  const requestData: GetConversationRequestData = {
    conversation_id: conversationId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.conversation.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The conversation with the id '${response.id}' has the last message received at '${response.last_received}'`);
  } else {
    printFullResponse(response);
  }

})();
