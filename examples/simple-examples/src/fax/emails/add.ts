import { Fax } from '@sinch/sdk-core';
import {
  getFaxEmailFromConfig,
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
  const email = getFaxEmailFromConfig();

  const requestData: Fax.AddEmailToNumbersRequestData = {
    emailRequestBody: {
      email,
      phoneNumbers: [
        phoneNumber,
      ],
    },
  };

  const faxService = initFaxService();
  const response = await faxService.emails.addToNumbers(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Email successfully added to numbers '${response.phoneNumbers?.join(', ')}'`);
  } else {
    printFullResponse(response);
  }
})();
