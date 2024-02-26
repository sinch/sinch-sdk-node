import { InjectEventRequestData } from '@sinch/sdk-core';
import {
  getContactIdFromConfig,
  getConversationIdFromConfig,
  initClient,
  printFullResponse,
} from '../../config';


(async () => {
  console.log('****************************');
  console.log('* Conversation_InjectEvent *');
  console.log('****************************');

  const conversationId = getConversationIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: InjectEventRequestData= {
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

  const sinchClient = initClient();
  const response = await sinchClient.conversation.conversation.injectEvent(requestData);

  printFullResponse(response);

})();
