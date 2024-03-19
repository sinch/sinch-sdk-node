import { DeleteFaxContentRequestData } from '@sinch/sdk-core';
import { getFaxIdFromConfig, initFaxService } from '../../config';

(async () => {
  console.log('************************');
  console.log('* deleteFaxContentById *');
  console.log('************************');

  const faxId = getFaxIdFromConfig();

  const requestData: DeleteFaxContentRequestData = {
    id: faxId,
  };

  const faxService = initFaxService();
  await faxService.faxes.deleteContent(requestData);

  console.log(`The content of the fax with the id '${requestData.id}' has been successfully removed from storage`);
})();
