import { UpdateServiceRequestData } from '@sinch/sdk-core';
import { getFaxServiceIdFromConfig, getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('*****************');
  console.log('* updateService *');
  console.log('*****************');

  const serviceId = getFaxServiceIdFromConfig();

  const requestData: UpdateServiceRequestData = {
    serviceId,
    updateServiceRequestBody: {
      name: 'Updated name with the Node.js SDK',
      incomingWebhookUrl: 'https://yourserver/incomingFax',
      webhookContentType: 'application/json',
      defaultForProject: true,
      imageConversionMethod: 'MONOCHROME',
      saveOutboundFaxDocuments: true,
      saveInboundFaxDocuments: true,
    },
  };

  const sinchClient = initClient();
  const response = await sinchClient.fax.services.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The service with the id '${response.id}' has been updated - New name: ${response.name}`);
  } else {
    printFullResponse(response);
  }
})();
