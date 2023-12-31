import {
  readApplicationKey,
  getPhoneNumberFromConfig,
  getPrintFormat,
  readServicePlanId,
  initClient,
  printFullResponse,
} from '../../config';
import {
  RentNumberRequest,
  RentNumberRequestData,
} from '@sinch/sdk-core';

(async () => {
  console.log('****************************');
  console.log('* NumberService_RentNumber *');
  console.log('****************************');

  const servicePlanId = readServicePlanId();
  const appId = readApplicationKey();

  let rentNumberRequest: RentNumberRequest = {
    smsConfiguration: servicePlanId ? { servicePlanId } : undefined,
    voiceConfiguration: appId ? { appId } : undefined,
  };

  if (!rentNumberRequest.smsConfiguration && !rentNumberRequest.voiceConfiguration) {
    rentNumberRequest = {};
    console.error('Warning: no configuration has been provided for sms and voice configuration.'
      + 'You may want to check the value of "SINCH_SERVICE_PLAN_ID" and "SINCH_APPLICATION_KEY" in the .env file');
  }

  const phoneNumber = getPhoneNumberFromConfig();
  
  const requestData: RentNumberRequestData = {
    phoneNumber,
    rentNumberRequestBody: rentNumberRequest,
  };

  const sinchClient = initClient();
  const response = await sinchClient.numbers.availableNumber.rent(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    const prettyResponse = response.phoneNumber;
    console.log(JSON.stringify(prettyResponse, null, 2));
  } else {
    printFullResponse(response);
  }
})();
