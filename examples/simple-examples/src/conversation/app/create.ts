import { Conversation } from '@sinch/sdk-core';
import {
  getMessengerTokenFormConfig,
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*****************');
  console.log('* App_CreateApp *');
  console.log('*****************');

  const messengerToken = getMessengerTokenFormConfig();

  const requestData: Conversation.CreateAppRequestData = {
    appCreateRequestBody: {
      display_name: 'New app created with the Node.js SDK',
      channel_credentials: [
        {
          channel: 'MESSENGER',
          static_token: {
            token: messengerToken,
          },
        },
      ],
      conversation_metadata_report_view: 'FULL',
      retention_policy: {
        retention_type: 'CONVERSATION_EXPIRE_POLICY',
        ttl_days: 60,
      },
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.app.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New app created with the id '${response.id}'`);
  } else {
    printFullResponse(response);
  }
  console.log(`You may want to update your .env file with the following value: CONVERSATION_APP_ID=${response.id}`);
})();
