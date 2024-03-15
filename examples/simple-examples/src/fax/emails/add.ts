import { AddEmailToNumbersRequestData } from '@sinch/sdk-core';
import {
  getFaxEmailFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  initClient,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*************************');
  console.log('* createEmailForProject *');
  console.log('*************************');

  const phoneNumber = getPhoneNumberFromConfig();
  const email = getFaxEmailFromConfig();

  const requestData: AddEmailToNumbersRequestData = {
    emailRequestBody: {
      email,
      phoneNumbers: [
        phoneNumber,
      ],
    },
  };

  const sinchClient = initClient();
  const response = await sinchClient.fax.emails.addToNumbers(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Email successfully added to numbers '${response.phoneNumbers?.join(', ')}'`);
  } else {
    printFullResponse(response);
  }
})();
