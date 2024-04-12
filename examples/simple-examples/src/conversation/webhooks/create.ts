import { Conversation } from '@sinch/sdk-core';
import {
  getAppIdFromConfig,
  getPrintFormat, getWebhookTargetFromConfig,
  initConversationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**************************');
  console.log('* Webhooks_CreateWebhook *');
  console.log('**************************');

  const appId = getAppIdFromConfig();
  const webhookTarget = getWebhookTargetFromConfig();

  const requestData: Conversation.CreateWebhookRequestData = {
    webhookCreateRequestBody: {
      app_id: appId,
      target: webhookTarget,
      target_type: 'HTTP',
      triggers: [
        'MESSAGE_DELIVERY',
        'MESSAGE_INBOUND',
        'CAPABILITY',
        'CONTACT_CREATE',
        'CONTACT_UPDATE',
        'CONTACT_DELETE',
        'CONTACT_MERGE',
      ],
      secret: 'A secret',
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.webhooks.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New webhook created with the id '${response.id}'`);
  } else {
    printFullResponse(response);
  }

})();
