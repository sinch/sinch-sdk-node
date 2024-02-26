import { CreateServiceRequestData } from '@sinch/sdk-core';
import { getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('*****************');
  console.log('* createService *');
  console.log('*****************');

  const requestData: CreateServiceRequestData = {

  };

  const sinchClient = initClient();
  const response = await sinchClient.fax.services.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New service created with the id '${response.id}'`);
  } else {
    printFullResponse(response);
  }
  console.log(`You may want to update your .env file with the following value: FAX_SERVICE_ID=${response.id}`);
})();
