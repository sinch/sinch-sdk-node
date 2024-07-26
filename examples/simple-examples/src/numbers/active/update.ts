import {
  getNumberCallbackUrlFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  getServicePlanIdFromConfig,
  initNumbersService,
  printFullResponse,
} from '../../config';
import { Numbers } from '@sinch/sdk-core';

(async () => {
  console.log('************************************');
  console.log('* NumberService_UpdateActiveNumber *');
  console.log('************************************');

  const phoneNumber = getPhoneNumberFromConfig();
  const servicePlanId = getServicePlanIdFromConfig();
  const callbackUrl = getNumberCallbackUrlFromConfig();

  const requestData: Numbers.UpdateActiveNumberRequestData= {
    phoneNumber,
    updateActiveNumberRequestBody: {
      displayName: 'New display name updated with the Sinch Node.js SDK',
      smsConfiguration: {
        servicePlanId,
      },
      callbackUrl,
    },
  };

  const numbersService = initNumbersService();
  const response = await numbersService.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The phone number ${response.phoneNumber} has been updated. The servicePlanId is ${response.smsConfiguration?.servicePlanId}`);
  } else {
    printFullResponse(response);
  }
})();
