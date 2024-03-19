import { StopActiveConversationRequestData } from '@sinch/sdk-core';
import { getConversationIdFromConfig, initConversationService, printFullResponse } from '../../config';


(async () => {
  console.log('***************************************');
  console.log('* Conversation_StopActiveConversation *');
  console.log('***************************************');

  const conversationId = getConversationIdFromConfig();

  const requestData: StopActiveConversationRequestData = {
    conversation_id: conversationId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.conversation.stopActive(requestData);

  printFullResponse(response);

})();
