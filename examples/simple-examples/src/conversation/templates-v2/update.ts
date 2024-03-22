import { templateV2Helper, V2TemplateTranslation, V2UpdateTemplateRequestData } from '@sinch/sdk-core';
import { getPrintFormat, getTemplateIdFromConfig, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('*******************************');
  console.log('* Templates_v2_UpdateTemplate *');
  console.log('*******************************');

  const templateId = getTemplateIdFromConfig();

  const conversationService = initConversationService();
  const templateV2Response = await conversationService.templatesV2.get({
    template_id: templateId,
  });

  const requestData: V2UpdateTemplateRequestData = {
    template_id: templateId,
    updateTemplateRequestBody: {
      version: templateV2Response.version,
      description: 'Updated description for Template v2',
      default_translation: templateV2Response.default_translation,
      translations: [
        // Repeat previous content to not lose it on update
        ...templateV2Helper.getPreviousTranslations(templateV2Response.translations),
        // New translation added in the scope of the update
        {
          language_code: 'fr-FR',
          version: '1',
          ...templateV2Helper.buildLocationMessageContent({
            title: 'Phare d\'Eckmühl',
            label: 'Pointe de Penmarch',
            coordinates: {
              latitude: 47.7981899,
              longitude: -4.3727685,
            },
          }),
        },
      ],
    },
  };

  const response = await conversationService.templatesV2.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Template update:\nDefault translation: ${response.default_translation}\nList of translations:\n${response.translations?.map((translation) => formatPrettyMessage(translation)).join('\n')}`);
  } else {
    printFullResponse(response);
  }

})();

const formatPrettyMessage = (translation: V2TemplateTranslation) => {
  const message = templateV2Helper.getMessageFromTranslation(translation);
  return ` - Language code: ${translation.language_code} - Version: '${translation.version}' - Message: ${JSON.stringify(message.content)}`;
};

