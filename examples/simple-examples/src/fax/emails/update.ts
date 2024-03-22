import { UpdateEmailRequestData } from '@sinch/sdk-core';
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

  const requestData: UpdateEmailRequestData = {
    email,
    updateEmailRequestBody: {
      phoneNumbers: [
        phoneNumber,
        '+14155552222',
      ],
    },
  };

  const faxService = initFaxService();
  const response = await faxService.emails.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Email successfully updated with numbers '${response.phoneNumbers?.join(', ')}'`);
  } else {
    printFullResponse(response);
  }
})();
