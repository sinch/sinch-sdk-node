import {
  getPrintFormat,
  initClient,
  printFullResponse,
  readApplicationKey,
  readServicePlanId,
} from '../../config';
import {
  RentAnyNumberRequest,
  RentAnyNumberRequestData,
} from '@sinch/sdk-core';

(async () => {
  console.log('*******************************');
  console.log('* NumberService_RentAnyNumber *');
  console.log('*******************************');

  const servicePlanId = readServicePlanId();
  const appId = readApplicationKey();

  if (!servicePlanId && !appId) {
    console.error('Warning: no configuration has been provided for sms and voice configuration.'
      + 'You may want to check the value of "SINCH_SERVICE_PLAN_ID" and "SINCH_APPLICATION_KEY" in the .env file');
  }

  const rentAnyNumberRequest: RentAnyNumberRequest = {
    regionCode: 'US',
    type: 'LOCAL',
    numberPattern: {
      searchPattern: 'START',
      pattern: '+1781',
    },
  };

  if (servicePlanId) {
    rentAnyNumberRequest.smsConfiguration = { servicePlanId };
  }

  if (appId) {
    rentAnyNumberRequest.voiceConfiguration = { appId };
  }

  const requestData: RentAnyNumberRequestData = {
    rentAnyNumberRequestBody: rentAnyNumberRequest,
  };

  const sinchClient = initClient();
  const response = await sinchClient.numbers.availableNumber.rentAny(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    const prettyResponse = response.phoneNumber;
    console.log(JSON.stringify(prettyResponse, null, 2));
  } else {
    printFullResponse(response);
  }
})();
