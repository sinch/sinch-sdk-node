import { DeleteTemplateRequestData } from '@sinch/sdk-core';
import { getTemplateIdFromConfig, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('****************************');
  console.log('* Templates_DeleteTemplate *');
  console.log('****************************');

  const templateId = getTemplateIdFromConfig();

  const requestData: DeleteTemplateRequestData = {
    template_id: templateId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.conversation.templatesV1.delete(requestData);

  printFullResponse(response);

})();
