import { LookupCapabilityRequestData } from '@sinch/sdk-core';
import {
  getAppIdFromConfig,
  getContactIdFromConfig,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('******************************');
  console.log('* Capability_QueryCapability *');
  console.log('******************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: LookupCapabilityRequestData = {
    lookupCapabilityRequestBody: {
      app_id: appId,
      recipient: {
        contact_id: contactId,
      },
      request_id: 'myPersonalId_' + new Date().getTime(),
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.capability.lookup(requestData);

  printFullResponse(response);

})();
