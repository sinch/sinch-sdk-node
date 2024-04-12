import { Conversation } from '@sinch/sdk-core';
import { getPrintFormat, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('***************************');
  console.log('* Templates_ListTemplates *');
  console.log('***************************');


  const requestData: Conversation.ListTemplatesRequestData = {
  };

  const conversationService = initConversationService();
  const response = await conversationService.templatesV1.list(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Templates:\n${response.templates?.map((template) => formatPrettyMessage(template)).join('\n')}`);
  } else {
    printFullResponse(response);
  }

})();

const formatPrettyMessage = (template: Conversation.V1Template) => {
  return ` - ID: ${template.id} - Default translation: ${template.default_translation} - Available translations: ${template.translations?.map((translation) => translation.language_code).join(',')}`;
};
