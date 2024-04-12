import { Conversation } from '@sinch/sdk-core';
import {
  getConversationIdFromConfig,
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('********************************');
  console.log('* Conversation_GetConversation *');
  console.log('********************************');

  const conversationId = getConversationIdFromConfig();

  const requestData: Conversation.GetConversationRequestData = {
    conversation_id: conversationId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.conversation.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The conversation with the id '${response.id}' has the last message received at '${response.last_received}'`);
  } else {
    printFullResponse(response);
  }

})();
