import { DeleteAppRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('*****************');
  console.log('* App_DeleteApp *');
  console.log('*****************');

  const appId = getAppIdFromConfig();

  const requestData: DeleteAppRequestData = {
    app_id: appId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.app.delete(requestData);

  printFullResponse(response);

})();
