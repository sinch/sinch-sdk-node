import { UpdateWebhookRequestData } from '@sinch/sdk-core';
import {
  getAppIdFromConfig,
  getPrintFormat, getWebhookIdFromConfig,
  initConversationService,
  printFullResponse,
} from '../../config';


(async () => {
  console.log('**************************');
  console.log('* Webhooks_UpdateWebhook *');
  console.log('**************************');

  const webhookId = getWebhookIdFromConfig();
  const appId = getAppIdFromConfig();

  const requestData: UpdateWebhookRequestData = {
    webhook_id: webhookId,
    update_mask: ['triggers', 'secret'],
    webhookUpdateRequestBody: {
      app_id: appId,
      triggers: [
        'CONVERSATION_START',
        'CONVERSATION_STOP',
        'CONVERSATION_DELETE',
      ],
      target: 'http://no-update.url',
      secret: 'New secret',
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.webhooks.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Webhook updated! New triggers: '${response.triggers.join(', ')}`);
    console.log(`Verifying the target (it should the original URL): '${response.target}'`);
  } else {
    printFullResponse(response);
  }

})();
