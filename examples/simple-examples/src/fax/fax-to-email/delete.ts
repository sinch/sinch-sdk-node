import { Fax } from '@sinch/sdk-core';
import { getFaxEmailFromConfig, getFaxServiceIdFromConfig, initFaxService } from '../../config';

(async () => {
  console.log('***************');
  console.log('* deleteEmail *');
  console.log('***************');

  const serviceId = getFaxServiceIdFromConfig();
  const email = getFaxEmailFromConfig();

  const requestData: Fax.DeleteEmailRequestData = {
    serviceId,
    email,
  };

  const faxService = initFaxService();
  await faxService.faxToEmail.delete(requestData);

  console.log(`The email '${requestData.email}' has been successfully removed`);
})();
