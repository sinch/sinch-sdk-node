import { DeleteContactRequestData } from '@sinch/sdk-core';
import { getContactIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('*************************');
  console.log('* Contact_DeleteContact *');
  console.log('*************************');

  const contactId = getContactIdFromConfig();

  const requestData: DeleteContactRequestData = {
    contact_id: contactId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.contact.delete(requestData);

  printFullResponse(response);

})();
