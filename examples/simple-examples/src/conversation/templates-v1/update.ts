import { templateV1Helper, UpdateTemplateRequestData } from '@sinch/sdk-core';
import { getPrintFormat, getTemplateIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('****************************');
  console.log('* Templates_UpdateTemplate *');
  console.log('****************************');

  const templateId = getTemplateIdFromConfig();

  const requestData: UpdateTemplateRequestData = {
    template_id: templateId,
    updateTemplateRequestBody: {
      description: 'Updated description for Template v1',
      default_translation: 'en-US',
      channel: 'CONVERSATION',
      translations: [
        // Repeat previous content to not lose it on update
        {
          language_code: 'en-US',
          version: '1',
          content: templateV1Helper.buildTextMessageContent({
            text: 'Message from a template v1.',
          }),
        },
        // New translation added in the scope of the update
        {
          language_code: 'fr-FR',
          version: '1',
          content: templateV1Helper.buildLocationMessageContent({
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

  const sinchClient = initClient();
  const response = await sinchClient.conversation.templatesV1.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Template update for channel: '${response.channel}' (requested: '${requestData.updateTemplateRequestBody.channel}'):\nDefault translation: ${response.default_translation}\nList of translations:\n${response.translations?.map((translation) => ' - ' + translation.language_code + ' - ' + translation.content).join('\n')}`);
  } else {
    printFullResponse(response);
  }

})();
