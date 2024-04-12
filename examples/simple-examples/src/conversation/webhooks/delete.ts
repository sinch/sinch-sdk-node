import { Conversation } from '@sinch/sdk-core';
import { getWebhookIdFromConfig, initConversationService, printFullResponse } from '../../config';


(async () => {
  console.log('**************************');
  console.log('* Webhooks_DeleteWebhook *');
  console.log('**************************');

  const webhookId = getWebhookIdFromConfig();

  const requestData: Conversation.DeleteWebhookRequestData = {
    webhook_id: webhookId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.webhooks.delete(requestData);

  printFullResponse(response);

})();
