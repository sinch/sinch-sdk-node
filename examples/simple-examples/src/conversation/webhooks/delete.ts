import { DeleteWebhookRequestData } from '@sinch/sdk-core';
import { getWebhookIdFromConfig, initClient, printFullResponse } from '../../config';


(async () => {
  console.log('**************************');
  console.log('* Webhooks_DeleteWebhook *');
  console.log('**************************');

  const webhookId = getWebhookIdFromConfig();

  const requestData: DeleteWebhookRequestData = {
    webhook_id: webhookId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.webhooks.delete(requestData);

  printFullResponse(response);

})();
