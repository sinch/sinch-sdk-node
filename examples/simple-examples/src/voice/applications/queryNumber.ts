import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  initVoiceService,
  printFullResponse,
} from '../../config';
import { Voice } from '@sinch/sdk-core';

(async () => {
  console.log('***********************');
  console.log('* Calling_QueryNumber *');
  console.log('***********************');

  const phoneNumber = getPhoneNumberFromConfig();

  const requestData: Voice.QueryNumberRequestData = {
    number: phoneNumber,
  };

  const voiceService = initVoiceService();
  let response;
  try {
    response = await voiceService.applications.queryNumber(requestData);
  } catch (error) {
    console.log(`Impossible to get information about the number ${requestData.number}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The number '${response.number?.normalizedNumber}' is of type "${response.number?.numberType}"\nRate: ${response.number?.rate?.amount} ${response.number?.rate?.currencyId}`);
  } else {
    printFullResponse(response);
  }
})();
