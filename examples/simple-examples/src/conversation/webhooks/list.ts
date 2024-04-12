import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, getPrintFormat, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('*************************');
  console.log('* Webhooks_ListWebhooks *');
  console.log('*************************');

  const appId = getAppIdFromConfig();

  const requestData: Conversation.ListWebhooksRequestData = {
    app_id: appId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.webhooks.list(requestData);

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
