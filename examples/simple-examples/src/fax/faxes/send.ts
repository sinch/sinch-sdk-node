import { SendFaxRequestData } from '@sinch/sdk-core';
import {
  getFaxCallbackUrlFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  initFaxService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('***********');
  console.log('* sendFax *');
  console.log('***********');

  const originPhoneNumber = getPhoneNumberFromConfig();
  const destinationPhoneNumber = getPhoneNumberFromConfig();
  const faxCallbackUrl = getFaxCallbackUrlFromConfig();

  const requestData: SendFaxRequestData = {
    sendFaxRequestBody: {
      to: destinationPhoneNumber,
      from: originPhoneNumber,
      contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
      callbackUrl: faxCallbackUrl,
      callbackContentType: 'application/json',
    },
  };

  const faxService = initFaxService();
  const response = await faxService.faxes.send(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Fax successfully created at '${response.createTime?.toISOString()}'. Status = '${response.status}'`);
  } else {
    printFullResponse(response);
  }
})();
