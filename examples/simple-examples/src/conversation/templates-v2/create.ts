import { templateV2Helper, V2CreateTemplateRequestData } from '@sinch/sdk-core';
import { getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('*******************************');
  console.log('* Templates_v2_CreateTemplate *');
  console.log('*******************************');

  const requestData: V2CreateTemplateRequestData = {
    createTemplateRequestBody: {
      description: 'Template v2',
      default_translation: 'en-US',
      translations: [
        {
          language_code: 'en-US',
          version: '1',
          ...templateV2Helper.buildTextMessageContent({
            text: 'Message from a template v2.',
          }),
        },
      ],
    },
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.templatesV2.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New template created with the id '${response.id}'.\nDefault translation: ${response.default_translation} - Version: ${response.version}\nList of translations: ${response.translations?.map((translation) => translation.language_code).join(', ')}`);
  } else {
    printFullResponse(response);
  }

})();
