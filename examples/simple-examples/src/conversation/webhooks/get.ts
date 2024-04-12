import { Conversation } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getWebhookIdFromConfig,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('***********************');
  console.log('* Webhooks_GetWebhook *');
  console.log('***********************');

  const webhookId = getWebhookIdFromConfig();

  const requestData: Conversation.GetWebhookRequestData = {
    webhook_id: webhookId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.webhooks.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Webhook id: ${response.id} - Triggers: ${response.triggers.join(', ')}`);
  } else {
    printFullResponse(response);
  }

})();
