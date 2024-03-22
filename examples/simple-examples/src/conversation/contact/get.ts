import { GetContactRequestData } from '@sinch/sdk-core';
import { getContactIdFromConfig, getPrintFormat, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('**********************');
  console.log('* Contact_GetContact *');
  console.log('**********************');

  const contactId = getContactIdFromConfig();

  const requestData: GetContactRequestData = {
    contact_id: contactId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.contact.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The contact with the id '${response.id}' is named '${response.display_name}'`);
  } else {
    printFullResponse(response);
  }

})();
