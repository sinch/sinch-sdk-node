import { Fax } from '@sinch/sdk-core';
import {
  getFaxEmailFromConfig,
  getFaxServiceIdFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  initFaxService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*************************');
  console.log('* createEmailForProject *');
  console.log('*************************');

  const phoneNumber = getPhoneNumberFromConfig();
  const serviceId = getFaxServiceIdFromConfig();
  const email = getFaxEmailFromConfig();

  const requestData: Fax.AddEmailToNumbersRequestData = {
    serviceId,
    emailRequestBody: {
      email,
      phoneNumbers: [
        {
          number: phoneNumber,
        },
      ],
    },
  };

  const faxService = initFaxService();
  const response = await faxService.faxToEmail.addToNumbers(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Email successfully added to numbers '${response.phoneNumbers?.join(', ')}'`);
  } else {
    printFullResponse(response);
  }
})();
