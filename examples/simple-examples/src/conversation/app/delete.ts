import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('*****************');
  console.log('* App_DeleteApp *');
  console.log('*****************');

  const appId = getAppIdFromConfig();

  const requestData: Conversation.DeleteAppRequestData = {
    app_id: appId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.app.delete(requestData);

  printFullResponse(response);

})();
