import { StopActiveConversationRequestData } from '@sinch/sdk-core';
import { getConversationIdFromConfig, initClient, printFullResponse } from '../../config';


(async () => {
  console.log('***************************************');
  console.log('* Conversation_StopActiveConversation *');
  console.log('***************************************');

  const conversationId = getConversationIdFromConfig();

  const requestData: StopActiveConversationRequestData = {
    conversation_id: conversationId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.conversation.stopActive(requestData);

  printFullResponse(response);

})();
