import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getServicePlanIdFromConfig,
  initClient,
  printFullResponse,
} from '../../config';
import { UpdateActiveNumberRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('************************************');
  console.log('* NumberService_UpdateActiveNumber *');
  console.log('************************************');

  const phoneNumber = getPhoneNumberFromConfig();
  if (!phoneNumber) {
    throw new Error('No phone number has been provided. '
      + 'Please update your .env file or edit the ./src/numbers/active/update.ts file');
  }

  const servicePlanId = getServicePlanIdFromConfig();
  if (!servicePlanId) {
    throw new Error('No servicePlanId has been provided. '
      + 'Please update your .env file or edit the ./src/numbers/active/update.ts file');
  }

  const requestData: UpdateActiveNumberRequestData= {
    phoneNumber,
    activeNumberRequestBody: {
      displayName: 'New display name updated with the Sinch Node.js SDK',
      smsConfiguration: {
        servicePlanId,
      },
    },
  };

  const sinchClient = initClient();
  const response = await sinchClient.numbers.activeNumber.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The phone number ${response.phoneNumber} has been updated. The servicePlanId is ${response.smsConfiguration?.servicePlanId}`);
  } else {
    printFullResponse(response);
  }
})();
