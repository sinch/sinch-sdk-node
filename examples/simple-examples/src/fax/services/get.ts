import { GetServiceRequestData } from '@sinch/sdk-core';
import { getFaxServiceIdFromConfig, getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('**************');
  console.log('* getService *');
  console.log('**************');

  const serviceId = getFaxServiceIdFromConfig();

  const requestData: GetServiceRequestData = {
    serviceId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.fax.services.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Service found: name = '${response.name}'`);
  } else {
    printFullResponse(response);
  }
})();
