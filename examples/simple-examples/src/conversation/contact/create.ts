import { CreateContactRequestData } from '@sinch/sdk-core';
import {
  getAppIdFromConfig,
  getMessengerUserIdFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*************************');
  console.log('* Contact_CreateContact *');
  console.log('*************************');

  const phoneNumber = getPhoneNumberFromConfig();
  const messengerUserId = getMessengerUserIdFromConfig();
  const appId = getAppIdFromConfig();

  const requestData: CreateContactRequestData = {
    contactCreateRequestBody: {
      display_name: 'New contact created with the Node.js SDK',
      channel_identities: [
        {
          identity: messengerUserId,
          channel: 'MESSENGER',
          app_id:appId,
        },
        {
          identity: phoneNumber,
          channel: 'WHATSAPP',
        },
      ],
      channel_priority: ['MESSENGER'],
      language: 'EN_US',
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.contact.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New contact created with the id '${response.id}'`);
  } else {
    printFullResponse(response);
  }

})();
