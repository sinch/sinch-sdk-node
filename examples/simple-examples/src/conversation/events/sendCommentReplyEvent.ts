import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('********************');
  console.log('* Events_SendEvent *');
  console.log('********************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: Conversation.SendCommentReplyEventRequestData<Conversation.ContactId> = {
    sendEventRequestBody: {
      app_id: appId,
      recipient: {
        contact_id: contactId,
      },
      event: {
        comment_reply_event: {
          text: 'Comment data',
        },
      },
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.events.sendCommentReplyEvent(requestData);

  printFullResponse(response);

})();
