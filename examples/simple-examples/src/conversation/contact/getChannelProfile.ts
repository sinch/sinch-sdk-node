import { GetChannelProfileRequestData } from '@sinch/sdk-core';
import {
  getAppIdFromConfig,
  getMessengerUserIdFromConfig,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*****************************');
  console.log('* Contact_GetChannelProfile *');
  console.log('*****************************');

  const appId = getAppIdFromConfig();
  const messengerUserId = getMessengerUserIdFromConfig();

  const requestData: GetChannelProfileRequestData = {
    getChannelProfileRequestBody: {
      app_id: appId,
      channel: 'MESSENGER',
      recipient: {
        identified_by: {
          channel_identities: [
            {
              identity: messengerUserId,
              channel: 'MESSENGER',
            },
          ],
        },
      },
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.contact.getChannelProfile(requestData);

  printFullResponse(response);

})();
