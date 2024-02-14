import { GetWebhookRequestData } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getWebhookIdFromConfig,
  initClient,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('***********************');
  console.log('* Webhooks_GetWebhook *');
  console.log('***********************');

  const webhookId = getWebhookIdFromConfig();

  const requestData: GetWebhookRequestData = {
    webhook_id: webhookId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.webhooks.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Webhook id: ${response.id} - Triggers: ${response.triggers.join(', ')}`);
  } else {
    printFullResponse(response);
  }

})();
