import { DeleteConversationRequestData } from '@sinch/sdk-core';
import { getConversationIdFromConfig, initClient, printFullResponse } from '../../config';


(async () => {
  console.log('***********************************');
  console.log('* Conversation_DeleteConversation *');
  console.log('***********************************');

  const conversationId = getConversationIdFromConfig();

  const requestData: DeleteConversationRequestData = {
    conversation_id: conversationId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.conversation.delete(requestData);

  printFullResponse(response);

})();
