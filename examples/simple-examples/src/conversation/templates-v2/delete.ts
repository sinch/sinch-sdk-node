import { Conversation } from '@sinch/sdk-core';
import { getTemplateIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('*******************************');
  console.log('* Templates_v2_DeleteTemplate *');
  console.log('*******************************');

  const templateId = getTemplateIdFromConfig();

  const requestData: Conversation.V2DeleteTemplateRequestData = {
    template_id: templateId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.templatesV2.delete(requestData);

  printFullResponse(response);

})();
