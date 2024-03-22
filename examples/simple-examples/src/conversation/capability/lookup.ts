import { ContactId, LookupCapabilityRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('******************************');
  console.log('* Capability_QueryCapability *');
  console.log('******************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: LookupCapabilityRequestData<ContactId> = {
    lookupCapabilityRequestBody: {
      app_id: appId,
      recipient: {
        contact_id: contactId,
      },
      request_id: 'myPersonalId_' + new Date().getTime(),
    },
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.capability.lookup(requestData);

  printFullResponse(response);

})();
