import { V2ListTemplatesRequestData, V2TemplateResponse } from '@sinch/sdk-core';
import { getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('******************************');
  console.log('* Templates_v2_ListTemplates *');
  console.log('******************************');


  const requestData: V2ListTemplatesRequestData = {
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.templatesV2.list(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Templates:\n${response.templates?.map((template) => formatPrettyMessage(template)).join('\n')}`);
  } else {
    printFullResponse(response);
  }

})();

const formatPrettyMessage = (template: V2TemplateResponse) => {
  return ` - ID: ${template.id} - Default translation: ${template.default_translation} - Version: ${template.version} - Available translations: ${template.translations?.map((translation) => translation.language_code + '(' +translation.version + ')').join(', ')}`;
};
