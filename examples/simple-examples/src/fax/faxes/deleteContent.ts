import { DeleteFaxContentRequestData } from '@sinch/sdk-core';
import { getFaxIdFromConfig, initClient } from '../../config';

(async () => {
  console.log('************************');
  console.log('* deleteFaxContentById *');
  console.log('************************');

  const faxId = getFaxIdFromConfig();

  const requestData: DeleteFaxContentRequestData = {
    id: faxId,
  };

  const sinchClient = initClient();
  await sinchClient.fax.faxes.deleteContent(requestData);

  console.log(`The content of the fax with the id '${requestData.id}' has been successfully removed from storage`);
})();
