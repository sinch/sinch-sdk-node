import { Fax } from '@sinch/sdk-core';
import {
  getFaxCallbackUrlFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  initFaxService,
  printFullResponse,
} from '../../config';
import * as fs from 'fs';

const getBase64 = (filePath: string): Fax.FaxBase64File => {
  const fileExtension = filePath.split('.').pop()?.toUpperCase();
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return {
      file: fileBuffer.toString('base64'),
      fileType: Fax.convertToSupportedFileType(fileExtension),
    };
  } catch (error) {
    console.error('Error reading or converting the file:', error);
    throw error;
  }
};

(async () => {
  console.log('*************************');
  console.log('* sendFax - base64 file *');
  console.log('*************************');

  const originPhoneNumber = getPhoneNumberFromConfig();
  const destinationPhoneNumber = getPhoneNumberFromConfig();
  const faxCallbackUrl = getFaxCallbackUrlFromConfig();

  const requestData: Fax.SendSingleFaxRequestData = {
    sendFaxRequestBody: {
      to: destinationPhoneNumber,
      from: originPhoneNumber,
      contentUrl: 'https://developers.sinch.com/',
      files: [getBase64('./fax-pdf/you-faxed.pdf')],
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
