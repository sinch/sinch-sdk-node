import { getPhoneNumberFromConfig, getPrintFormat, initApplicationClient, printFullResponse } from '../../config';
import { QueryNumberRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('***********************');
  console.log('* Calling_QueryNumber *');
  console.log('***********************');

  const requestData: QueryNumberRequestData = {
    number: getPhoneNumberFromConfig(),
  };

  const sinchClient = initApplicationClient();
  let response;
  try {
    response = await sinchClient.voice.applications.queryNumber(requestData);
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
