import { DeleteContactRequestData } from '@sinch/sdk-core';
import { getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('*************************');
  console.log('* Contact_DeleteContact *');
  console.log('*************************');

  const contactId = getContactIdFromConfig();

  const requestData: DeleteContactRequestData = {
    contact_id: contactId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.contact.delete(requestData);

  printFullResponse(response);

})();
