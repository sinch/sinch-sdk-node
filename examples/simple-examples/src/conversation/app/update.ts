import { Conversation } from '@sinch/sdk-core';
import {
  getAppIdFromConfig,
  getMessengerTokenFormConfig,
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*****************');
  console.log('* App_UpdateApp *');
  console.log('*****************');

  const appId = getAppIdFromConfig();

  const requestData: Conversation.UpdateAppRequestData = {
    app_id: appId,
    update_mask: ['display_name', 'conversation_metadata_report_view'],
    appUpdateRequestBody: {
      display_name: 'Updated name by the Node.js SDK',
      conversation_metadata_report_view: 'NONE',
      channel_credentials: [
        {
          channel: 'MESSENGER',
          static_token: {
            token: 'new token (invalid) - should not be updated thanks to the mask',
          },
        },
      ],

    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.app.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`App updated! New name: '${response.display_name}'.`);
    const token = getMessengerTokenFormConfig();
    const channelCredentials = response.channel_credentials?.[0];
    if(channelCredentials?.channel === 'MESSENGER') {
      console.log(`Verifying the token (it should be unchanged):\nOLD: '${token}'\nNEW: '${channelCredentials.static_token?.token}'`);
    }
  } else {
    printFullResponse(response);
  }

})();
