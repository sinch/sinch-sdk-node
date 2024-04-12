import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, getContactIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('********************************');
  console.log('* Messages_SendTemplateMessage *');
  console.log('********************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();

  const requestData: Conversation.SendTemplateMessageRequestData<Conversation.ContactId> = {
    sendMessageRequestBody: {
      app_id: appId,
      message: {
        template_message: {
          omni_template: {
            template_id: 'templateId',
            version: '1',
            language_code: 'en-US',
          },
        },
      },
      recipient: {
        contact_id: contactId,
      },
      correlation_id: 'correlatorId',
      queue: 'HIGH_PRIORITY',
      processing_strategy: 'DEFAULT',
      channel_priority_order: ['MESSENGER'],
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.messages.sendTemplateMessage(requestData);

  printFullResponse(response);

})();
