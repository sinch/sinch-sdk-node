import { ListWebhooksRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('*************************');
  console.log('* Webhooks_ListWebhooks *');
  console.log('*************************');

  const appId = getAppIdFromConfig();

  const requestData: ListWebhooksRequestData = {
    app_id: appId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.webhooks.list(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    if (response.webhooks && response.webhooks.length > 0) {
      console.log(`${response.webhooks.map((webhook) => `Webhook id: ${webhook.id} - Triggers: ${webhook.triggers.join(', ')}`).join('\n')}`);
    } else {
      console.log('Sorry, no webhooks were found.');
    }
  } else {
    printFullResponse(response);
  }

})();
