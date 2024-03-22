import { InjectMessageRequestData } from '@sinch/sdk-core';
import {
  getAppIdFromConfig, getContactIdFromConfig,
  getConversationIdFromConfig,
  getMessengerUserIdFromConfig,
  initConversationService,
  printFullResponse,
} from '../../config';


(async () => {
  console.log('******************************');
  console.log('* Conversation_InjectMessage *');
  console.log('******************************');

  const conversationId = getConversationIdFromConfig();
  const messengerUserId = getMessengerUserIdFromConfig();
  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: InjectMessageRequestData= {
    conversation_id: conversationId,
    injectMessageRequestBody: {
      app_message: {
        text_message: {
          text: 'test',
        },
      },
      direction: 'TO_CONTACT',
      channel_identity: {
        channel: 'MESSENGER',
        identity: messengerUserId,
        app_id: appId,
      },
      accept_time: new Date(),
      contact_id: contactId,
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.conversation.injectMessage(requestData);

  printFullResponse(response);

})();
