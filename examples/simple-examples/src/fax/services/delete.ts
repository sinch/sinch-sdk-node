import { Fax } from '@sinch/sdk-core';
import { getFaxServiceIdFromConfig, initFaxService } from '../../config';

(async () => {
  console.log('*****************');
  console.log('* removeService *');
  console.log('*****************');

  const serviceId = getFaxServiceIdFromConfig();

  const requestData: Fax.DeleteServiceRequestData = {
    serviceId,
  };

  const faxService = initFaxService();
  await faxService.services.delete(requestData);

  console.log(`The service with the id '${requestData.serviceId}' has been successfully removed`);
})();
