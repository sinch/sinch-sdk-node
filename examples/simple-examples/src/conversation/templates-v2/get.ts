import { Conversation } from '@sinch/sdk-core';
import { getPrintFormat, getTemplateIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('****************************');
  console.log('* Templates_v2_GetTemplate *');
  console.log('****************************');

  const templateId = getTemplateIdFromConfig();

  const requestData: Conversation.V2GetTemplateRequestData = {
    template_id: templateId,
  };

  const conversationService = initConversationService();
  const response = await conversationService.templatesV2.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Template retrieved from id '${response.id}'.\nDefault translation: ${response.default_translation} - Version: ${response.version}\nList of translations: ${response.translations?.map((translation) => translation.language_code).join(', ')}`);
  } else {
    printFullResponse(response);
  }

})();
