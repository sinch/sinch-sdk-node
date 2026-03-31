import { Conversation } from '@sinch/sdk-core';
import { initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('******************');
  console.log('* DeleteSettings *');
  console.log('******************');

  const requestData: Conversation.DeleteProjectSettingsRequestData = {};

  const conversationService = initConversationService();
  const response = await conversationService.projectSettings.delete(requestData);

  printFullResponse(response);
})();
