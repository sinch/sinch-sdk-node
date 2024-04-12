import {
  getContactIdFromConfig,
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';
import { Conversation } from '@sinch/sdk-core';

(async () => {
  console.log('*************************');
  console.log('* Contact_UpdateContact *');
  console.log('*************************');

  const contactId = getContactIdFromConfig();

  const requestData: Conversation.UpdateContactRequestData = {
    contact_id: contactId,
    update_mask:['channel_priority'],
    updateContactRequestBody: {
      display_name: 'Updated name with the Node.js SDK',
      language: 'FR',
      channel_priority: ['MESSENGER'],
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.contact.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Contact updated! New name: '${response.display_name}`);
    console.log(`Verifying the language (it should be unchanged):\nOLD: 'EN-US'\nNEW: '${response.language}'`);
  } else {
    printFullResponse(response);
  }

})();
