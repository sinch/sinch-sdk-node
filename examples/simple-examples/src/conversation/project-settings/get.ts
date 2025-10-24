import { Conversation } from '@sinch/sdk-core';
import {
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('***************');
  console.log('* GetSettings *');
  console.log('***************');

  const requestData: Conversation.GetProjectSettingsRequestData = {};

  const conversationService = initConversationService();
  const response = await conversationService.projectSettings.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Project settings: unified contact enabled: '${response.settings?.contact_settings?.unified_contact_id_enabled}'`);
  } else {
    printFullResponse(response);
  }
})();
