import { Fax } from '@sinch/sdk-core';
import {
  getFaxCallbackUrlFromConfig,
  getFaxServiceIdFromConfig,
  getPrintFormat,
  initFaxService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*****************');
  console.log('* updateService *');
  console.log('*****************');

  const serviceId = getFaxServiceIdFromConfig();
  const webhookUrl = getFaxCallbackUrlFromConfig();

  const requestData: Fax.UpdateServiceRequestData = {
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

  const faxService = initFaxService();
  const response = await faxService.services.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The service with the id '${response.id}' has been updated - New name: ${response.name}`);
  } else {
    printFullResponse(response);
  }
})();
