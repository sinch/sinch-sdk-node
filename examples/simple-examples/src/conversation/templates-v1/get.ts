import { GetTemplateRequestData } from '@sinch/sdk-core';
import { getPrintFormat, getTemplateIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('*************************');
  console.log('* Templates_GetTemplate *');
  console.log('*************************');

  const templateId = getTemplateIdFromConfig();

  const requestData: GetTemplateRequestData = {
    template_id: templateId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.templatesV1.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Template retrieved from id '${response.id}'.\nDefault translation: ${response.default_translation}\nList of translations: ${response.translations?.map((translation) => translation.language_code).join(', ')}`);
  } else {
    printFullResponse(response);
  }

})();
