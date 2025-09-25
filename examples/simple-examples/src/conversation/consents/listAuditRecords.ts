import { Conversation } from '@sinch/sdk-core';
import {
  getAppIdFromConfig,
  getPrintFormat, getRecipientPhoneNumberFromConfig,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('************************************');
  console.log('* ListAuditRecordsFromConsentsList *');
  console.log('************************************');

  const appId = getAppIdFromConfig();
  const identity = getRecipientPhoneNumberFromConfig().substring(1);

  const requestData: Conversation.ListAuditRecordsRequestData = {
    app_id: appId,
    identity,
  };

  const conversationService = initConversationService();
  const response = await conversationService.consents.listAuditRecords(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The audit record for the identity '${response.identity?.identity}' contains '${response.audit_records?.length}' audit records`);
  } else {
    printFullResponse(response);
  }

})();
