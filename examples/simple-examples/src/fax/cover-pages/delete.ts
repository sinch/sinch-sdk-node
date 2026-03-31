import { Fax } from '@sinch/sdk-core';
import { getFaxCoverPageIdFromConfig, getFaxServiceIdFromConfig, initFaxService } from '../../config';

(async () => {
  console.log('*******************');
  console.log('* DeleteCoverPage *');
  console.log('*******************');

  const serviceId = getFaxServiceIdFromConfig();
  const coverPageId = getFaxCoverPageIdFromConfig();

  const requestData: Fax.DeleteCoverPageRequestData = {
    serviceId,
    coverPageId,
  };

  const faxService = initFaxService();
  await faxService.coverPages.delete(requestData);

  console.log(`The cover page with the id '${requestData.coverPageId}' has been successfully deleted`);
})();
