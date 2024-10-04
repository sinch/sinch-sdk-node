import { Fax } from '@sinch/sdk-core';
import {
  getFaxCallbackUrlFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  initFaxService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*********************************');
  console.log('* sendFax - multiple recipients *');
  console.log('*********************************');

  const originPhoneNumber = getPhoneNumberFromConfig();
  const destinationPhoneNumber = getPhoneNumberFromConfig();
  const faxCallbackUrl = getFaxCallbackUrlFromConfig();

  const requestData: Fax.SendMultipleFaxRequestData = {
    sendFaxRequestBody: {
      to: [destinationPhoneNumber, destinationPhoneNumber],
      from: originPhoneNumber,
      contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
      callbackUrl: faxCallbackUrl,
      callbackUrlContentType: 'application/json',
      imageConversionMethod: 'MONOCHROME',
      headerTimeZone: 'Europe/Paris',
      headerText: ' - Sent with the Node.js SDK',
      maxRetries: 2,
    },
  };

  const faxService = initFaxService();
  const response = await faxService.faxes.send(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`${response.length} fax(es) successfully created.\n${response.map((fax) => ' - ' + fax.id + ' created at ' + fax.createTime?.toISOString()).join('\n')}`);
  } else {
    printFullResponse(response);
  }
})();
