import { Conversation } from '@sinch/sdk-core';
import {
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('******************');
  console.log('* UpdateSettings *');
  console.log('******************');

  const requestData: Conversation.UpdateProjectSettingsRequestData = {
    updateProjectSettingsRequestBody: {
      contact_settings: {
        unified_contact_id_enabled: false,
      },
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.projectSettings.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Project settings updated: unified contact enabled: '${response.settings?.contact_settings?.unified_contact_id_enabled}'`);
  } else {
    printFullResponse(response);
  }
})();
