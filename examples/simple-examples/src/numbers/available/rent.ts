import {
  readApplicationKey,
  getPhoneNumberFromConfig,
  getPrintFormat,
  readServicePlanId,
  printFullResponse,
  getNumberCallbackUrlFromConfig,
  initNumbersService,
} from '../../config';
import { Numbers } from '@sinch/sdk-core';

(async () => {
  console.log('****************************');
  console.log('* NumberService_RentNumber *');
  console.log('****************************');

  const callbackUrl = getNumberCallbackUrlFromConfig();
  const servicePlanId = readServicePlanId();
  const appId = readApplicationKey();

  let rentNumberRequest: Numbers.RentNumberRequest = {
    smsConfiguration: servicePlanId ? { servicePlanId } : undefined,
    voiceConfiguration: appId ? { appId } : undefined,
    callbackUrl,
  };

  if (!rentNumberRequest.smsConfiguration && !rentNumberRequest.voiceConfiguration) {
    rentNumberRequest = {};
    console.error('Warning: no configuration has been provided for sms and voice configuration.'
      + 'You may want to check the value of "SINCH_SERVICE_PLAN_ID" and "SINCH_APPLICATION_KEY" in the .env file');
  }

  const phoneNumber = getPhoneNumberFromConfig();

  const requestData: Numbers.RentNumberRequestData = {
    phoneNumber,
    rentNumberRequestBody: rentNumberRequest,
  };

  const numbersService = initNumbersService();
  const response = await numbersService.availableNumber.rent(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    const prettyResponse = response.phoneNumber;
    console.log(JSON.stringify(prettyResponse, null, 2));
  } else {
    printFullResponse(response);
  }
})();
