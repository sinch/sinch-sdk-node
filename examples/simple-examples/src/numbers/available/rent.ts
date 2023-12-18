import {
  getApplicationKeyFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  getServicePlanIdFromConfig,
  initClient,
  printFullResponse,
} from '../../config';
import {
  RentNumberRequestData,
} from '@sinch/sdk-core';
import { RentNumberRequest } from '@sinch/numbers/src';

(async () => {
  console.log('****************************');
  console.log('* NumberService_RentNumber *');
  console.log('****************************');

  // Use the phone number from the .env file
  const phoneNumber = getPhoneNumberFromConfig();
  if (!phoneNumber) {
    throw new Error('No phone number has been provided. '
      + 'Please update your .env file or edit the ./src/numbers/available/rent.ts file');
  }

  const servicePlanId = getServicePlanIdFromConfig()
  const appId = getApplicationKeyFromConfig();

  let rentNumberRequest: RentNumberRequest = {
    smsConfiguration: servicePlanId ? { servicePlanId } : undefined,
    voiceConfiguration: appId ? { appId } : undefined,
  };

  if (!rentNumberRequest.smsConfiguration && !rentNumberRequest.voiceConfiguration) {
    rentNumberRequest = {};
    console.error('Warning: no configuration has been provided for sms and voice configuration.'
      + 'You may want to check the value of "SERVICE_PLAN_ID" and "APPLICATION_KEY" in the .env file');
  }

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
