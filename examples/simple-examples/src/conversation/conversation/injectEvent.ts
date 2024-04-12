import { Conversation } from '@sinch/sdk-core';
import {
  getContactIdFromConfig,
  getConversationIdFromConfig,
  initConversationService,
  printFullResponse,
} from '../../config';


(async () => {
  console.log('****************************');
  console.log('* Conversation_InjectEvent *');
  console.log('****************************');

  const conversationId = getConversationIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: Conversation.InjectEventRequestData= {
    conversation_id: conversationId,
    injectConversationEventRequestBody: {
      app_event: {
        composing_event: {},
      },
      accept_time: new Date(),
      conversation_id: conversationId,
      contact_id: contactId,
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.conversation.injectEvent(requestData);

  printFullResponse(response);

})();
