import { Conversation } from '@sinch/sdk-core';
import {
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('******************');
  console.log('* CreateSettings *');
  console.log('******************');

  const requestData: Conversation.CreateProjectSettingsRequestData = {
    createProjectSettingsRequestBody: {
      contact_settings: {
        unified_contact_id_enabled: false,
      },
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.projectSettings.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Project settings created: unified contact enabled: '${response.settings?.contact_settings?.unified_contact_id_enabled}'`);
  } else {
    printFullResponse(response);
  }
})();
