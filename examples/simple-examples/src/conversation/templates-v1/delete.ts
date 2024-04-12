import { Conversation } from '@sinch/sdk-core';
import { getTemplateIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('****************************');
  console.log('* Templates_DeleteTemplate *');
  console.log('****************************');

  const templateId = getTemplateIdFromConfig();

  const requestData: Conversation.DeleteTemplateRequestData = {
    template_id: templateId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.templatesV1.delete(requestData);

  printFullResponse(response);

})();
