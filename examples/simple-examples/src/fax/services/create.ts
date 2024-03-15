import { CreateServiceRequestData } from '@sinch/sdk-core';
import { getPhoneNumberFromConfig, getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('*****************');
  console.log('* createService *');
  console.log('*****************');

  const phoneNumber = getPhoneNumberFromConfig();

  const requestData: CreateServiceRequestData = {
    createServiceRequestBody: {
      name: 'New service with the Node.js SDK',
      incomingWebhookUrl: 'https://yourserver/incomingFax',
      webhookContentType: 'multipart/form-data',
      defaultForProject: false,
      defaultFrom: phoneNumber,
      numberOfRetries: 3,
      retryDelaySeconds: 60,
      imageConversionMethod: 'HALFTONE',
      saveOutboundFaxDocuments: true,
      saveInboundFaxDocuments: true,
    },
  };

  const sinchClient = initClient();
  const response = await sinchClient.fax.services.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New service created with the id '${response.id}' - Name: ${response.name}`);
  } else {
    printFullResponse(response);
  }
  console.log(`You may want to update your .env file with the following value: FAX_SERVICE_ID=${response.id}`);
})();
