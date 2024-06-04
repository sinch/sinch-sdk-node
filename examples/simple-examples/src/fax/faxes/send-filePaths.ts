import { Fax } from '@sinch/sdk-core';
import {
  getFaxCallbackUrlFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  initFaxService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**********************');
  console.log('* sendFax - filePath *');
  console.log('**********************');

  const originPhoneNumber = getPhoneNumberFromConfig();
  const destinationPhoneNumber = getPhoneNumberFromConfig();
  const faxCallbackUrl = getFaxCallbackUrlFromConfig();

  const requestData: Fax.SendSingleFaxRequestData = {
    sendFaxRequestBody: {
      to: destinationPhoneNumber,
      from: originPhoneNumber,
      contentUrl: 'https://developers.sinch.com/',
      filePaths: ['./fax-pdf/you-faxed.pdf', './fax-pdf/you-faxed.pdf'],
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
    const fax = response[0];
    console.log(`Fax successfully created at '${fax.createTime?.toISOString()}'. Status = '${fax.status}'`);
  } else {
    printFullResponse(response);
  }
})();
