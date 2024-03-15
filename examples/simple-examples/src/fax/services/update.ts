import { UpdateServiceRequestData } from '@sinch/sdk-core';
import {
  getFaxCallbackUrlFromConfig,
  getFaxServiceIdFromConfig,
  getPrintFormat,
  initClient,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*****************');
  console.log('* updateService *');
  console.log('*****************');

  const serviceId = getFaxServiceIdFromConfig();
  const webhookUrl = getFaxCallbackUrlFromConfig();

  const requestData: UpdateServiceRequestData = {
    serviceId,
    updateServiceRequestBody: {
      name: 'Updated name with the Node.js SDK',
      incomingWebhookUrl: webhookUrl,
      webhookContentType: 'application/json',
      defaultForProject: true,
      imageConversionMethod: 'MONOCHROME',
      saveOutboundFaxDocuments: true,
      saveInboundFaxDocuments: true,
      emailSettings: {
        pdfPassword: 'pwd',
        useBodyAsCoverPage: true,
      },
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
