import { ContactId, SendCommentReplyEventRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('********************');
  console.log('* Events_SendEvent *');
  console.log('********************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: SendCommentReplyEventRequestData<ContactId> = {
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

  const sinchClient = initClient();
  const response = await sinchClient.conversation.events.sendCommentReplyEvent(requestData);

  printFullResponse(response);

})();
