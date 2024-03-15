import { DeleteServiceRequestData } from '@sinch/sdk-core';
import { getFaxServiceIdFromConfig, initClient } from '../../config';

(async () => {
  console.log('*****************');
  console.log('* removeService *');
  console.log('*****************');

  const serviceId = getFaxServiceIdFromConfig();

  const requestData: DeleteServiceRequestData = {
    serviceId,
  };

  const sinchClient = initClient();
  await sinchClient.fax.services.delete(requestData);

  console.log(`The service with the id '${requestData.serviceId}' has been successfully removed`);
})();
