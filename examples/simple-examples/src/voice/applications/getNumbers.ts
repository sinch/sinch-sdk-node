import { getPrintFormat, initVoiceService, printFullResponse } from '../../config';
import { GetNumbersRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('**************');
  console.log('* GetNumbers *');
  console.log('**************');

  const requestData: GetNumbersRequestData = {};

  const voiceService = initVoiceService();
  let response;
  try {
    response = await voiceService.applications.listNumbers(requestData);
  } catch (error) {
    console.log(`Impossible to get information about your numbers`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`You have ${response.numbers?.length} numbers: ${response.numbers?.map((number) => number.number).join(',')}`);
  } else {
    printFullResponse(response);
  }
})();
