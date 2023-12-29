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
  const servicePlanId = getServicePlanIdFromConfig();

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
