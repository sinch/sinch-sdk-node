import { UpdateEmailRequestData } from '@sinch/sdk-core';
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

  const requestData: UpdateEmailRequestData = {
    email,
    updateEmailRequestBody: {
      phoneNumbers: [
        phoneNumber,
        '+14155552222',
      ],
    },
  };

  const sinchClient = initClient();
  const response = await sinchClient.fax.emails.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Email successfully updated with numbers '${response.phoneNumbers?.join(', ')}'`);
  } else {
    printFullResponse(response);
  }
})();
