import { getPhoneNumberFromConfig, getPrintFormat, initClient, printFullResponse } from '../../config';
import { ReleaseNumberRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('*******************************');
  console.log('* NumberService_ReleaseNumber *');
  console.log('*******************************');

  const phoneNumber = getPhoneNumberFromConfig();
  if (!phoneNumber) {
    throw new Error('No phone number has been provided. '
      + 'Please update your .env file or edit the ./src/numbers/active/release.ts file');
  }

  const requestData: ReleaseNumberRequestData= {
    phoneNumber,
  };

  const sinchClient = initClient();
  const response = await sinchClient.numbers.activeNumber.release(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The phone number ${response.phoneNumber} will be released at ${response.expireAt}`);
  } else {
    printFullResponse(response);
  }
})();
