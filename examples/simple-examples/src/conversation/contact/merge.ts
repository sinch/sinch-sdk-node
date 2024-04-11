import { Conversation } from '@sinch/sdk-core';
import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';


(async () => {
  console.log('************************');
  console.log('* Contact_MergeContact *');
  console.log('************************');

  const phoneNumber = getPhoneNumberFromConfig();

  const sourceContactRequestData: Conversation.CreateContactRequestData = {
    contactCreateRequestBody: {
      channel_identities: [
        {
          channel: 'SMS',
          identity: phoneNumber,
        },
      ],
      language: 'FR',
      email: 'source@mail.com',
      display_name: 'Source Contact',
      metadata: 'Some metadata belonging to the source contact',
    },
  };

  const destinationContactRequestData: Conversation.CreateContactRequestData = {
    contactCreateRequestBody: {
      channel_identities: [
        {
          channel: 'MMS',
          identity: phoneNumber,
        },
      ],
      language: 'EN_US',
      channel_priority: ['MMS'],
      display_name: 'Destination Contact',
    },
  };

  const conversationService = initConversationService();
  const sourceContact = await conversationService.contact.create(sourceContactRequestData);
  const destinationContact = await conversationService.contact.create(destinationContactRequestData);

  if (sourceContact.id && destinationContact.id) {
    const requestData: Conversation.MergeContactRequestData = {
      destination_id: destinationContact.id,
      mergeContactRequestBody: {
        source_id: sourceContact.id,
        strategy: 'MERGE',
      },
    };

    const response = await conversationService.contact.mergeContact(requestData);

    const printFormat = getPrintFormat(process.argv);
    if (printFormat === 'pretty') {
      console.log(`The merged contact has the Id '${response.id}' (should be the same as the destination contact: '${destinationContact.id}')`);
      console.log(`The merged contact should still have the same '${destinationContact.language}' language from the destination contact: ${response.language}`);
      console.log(`The merged contact has now the email: ${response.email}`);
      console.log(`The merged contact has ${response.channel_identities?.length} channel identities: ${response.channel_identities?.map((channelIdentity) => channelIdentity.channel).join(', ')}`);
    }else {
      printFullResponse(response);
    }
  } else {
    console.log(`An error occurred when creating the contacts`);
  }

})();
