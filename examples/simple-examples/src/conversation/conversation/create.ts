import { Conversation } from '@sinch/sdk-core';
import {
  getAppIdFromConfig,
  getContactIdFromConfig,
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('***********************************');
  console.log('* Conversation_CreateConversation *');
  console.log('***********************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: Conversation.CreateConversationRequestData = {
    createConversationRequestBody: {
      app_id: appId,
      contact_id: contactId,
      active: true,
      active_channel: 'MESSENGER',
      metadata: 'somme metadata',
      metadata_json: {
        date: new Date(),
        string: 'metadata',
        number: 0,
        boolean: true,
      },
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.conversation.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New contact created with the id '${response.id}'`);
  } else {
    printFullResponse(response);
  }

})();
