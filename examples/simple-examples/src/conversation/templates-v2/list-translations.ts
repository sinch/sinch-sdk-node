import { Conversation } from '@sinch/sdk-core';
import { getPrintFormat, getTemplateIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('*********************************');
  console.log('* Templates_v2_ListTranslations *');
  console.log('*********************************');

  const templateId = getTemplateIdFromConfig();

  const conversationService = initConversationService();

  const templateV2Response = await conversationService.templatesV2.get({
    template_id: templateId,
  });

  if(!templateV2Response.translations || templateV2Response.translations.length === 0) {
    throw new Error(`The template '${templateId}' has no translations`);
  }

  // Get the first translation for the purpose of this example
  const translation = templateV2Response.translations[0];

  const requestData: Conversation.V2ListTranslationsRequestData = {
    template_id: templateId,
    // Optional parameters
    language_code: translation.language_code,
    translation_version: 'latest', // translation.version,
  };

  const response = await conversationService.templatesV2.listTranslations(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Translations:\n${response.translations?.map((translation) => formatPrettyMessage(translation)).join('\n')}`);
  } else {
    printFullResponse(response);
  }

})();

const formatPrettyMessage = (translation: Conversation.V2TemplateTranslation) => {
  const message = Conversation.templateV2Helper.getMessageFromTranslation(translation);
  return ` - Language code: ${translation.language_code} - Version: '${translation.version}' - Message: ${JSON.stringify(message.content)}`;
};
