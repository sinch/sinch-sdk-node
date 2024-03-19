import { ListAppsRequestData } from '@sinch/sdk-core';
import { getPrintFormat, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('****************');
  console.log('* App_ListApps *');
  console.log('****************');

  const requestData: ListAppsRequestData= {};

  const conversationService = initConversationService();
  const response = await conversationService.app.list(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(response.apps
      ? response.apps.map((app) => `'${app.id}': ${app.display_name}`).join('\n')
      : 'No Conversation Applications were found');
  } else {
    printFullResponse(response);
  }

})();
