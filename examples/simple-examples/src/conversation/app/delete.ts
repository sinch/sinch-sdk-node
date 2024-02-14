import { DeleteAppRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('*****************');
  console.log('* App_DeleteApp *');
  console.log('*****************');

  const appId = getAppIdFromConfig();

  const requestData: DeleteAppRequestData = {
    app_id: appId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.app.delete(requestData);

  printFullResponse(response);

})();
