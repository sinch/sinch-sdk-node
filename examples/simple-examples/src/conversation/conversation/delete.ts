import { Conversation } from '@sinch/sdk-core';
import { getConversationIdFromConfig, initConversationService, printFullResponse } from '../../config';


(async () => {
  console.log('***********************************');
  console.log('* Conversation_DeleteConversation *');
  console.log('***********************************');

  const conversationId = getConversationIdFromConfig();

  const requestData: Conversation.DeleteConversationRequestData = {
    conversation_id: conversationId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.conversation.delete(requestData);

  printFullResponse(response);

})();
