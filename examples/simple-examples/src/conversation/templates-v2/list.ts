import { Conversation } from '@sinch/sdk-core';
import { getPrintFormat, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('******************************');
  console.log('* Templates_v2_ListTemplates *');
  console.log('******************************');


  const requestData: Conversation.V2ListTemplatesRequestData = {
  };

  const conversationService = initConversationService();
  const response = await conversationService.templatesV2.list(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Templates:\n${response.templates?.map((template) => formatPrettyMessage(template)).join('\n')}`);
  } else {
    printFullResponse(response);
  }

})();

const formatPrettyMessage = (template: Conversation.V2TemplateResponse) => {
  return ` - ID: ${template.id} - Default translation: ${template.default_translation} - Version: ${template.version} - Available translations: ${template.translations?.map((translation) => translation.language_code + '(' +translation.version + ')').join(', ')}`;
};
