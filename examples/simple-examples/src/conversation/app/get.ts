import { GetAppRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('**************');
  console.log('* App_GetApp *');
  console.log('**************');

  const appId = getAppIdFromConfig();

  const requestData: GetAppRequestData = {
    app_id: appId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.app.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The app with the id '${response.id}' is named '${response.display_name}'`);
  } else {
    printFullResponse(response);
  }

})();
