import { ElasticSipTrunking, PageResult } from '@sinch/sdk-core';
import { getPrintFormat, initElasticSipTrunkingService, printFullResponse } from '../../config';

const populatePhoneNumbersList = (
  phoneNumbersPage: PageResult<ElasticSipTrunking.PhoneNumber>,
  phoneNumbersList: ElasticSipTrunking.PhoneNumber[],
  phoneNumbersDetailsList: string[],
) => {
  phoneNumbersPage.data.map((phoneNumber: ElasticSipTrunking.PhoneNumber) => {
    phoneNumbersList.push(phoneNumber);
    phoneNumbersDetailsList.push(`${phoneNumber.phoneNumber} - SIP trunk: ${phoneNumber.sipTrunkId}`);
  });
};

(async () => {
  console.log('*******************');
  console.log('* GetPhoneNumbers *');
  console.log('*******************');

  const requestData: ElasticSipTrunking.ListPhoneNumbersRequestData = {};

  const elasticSipTrunkingService = initElasticSipTrunkingService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await elasticSipTrunkingService.phoneNumbers.list(requestData);

  const phoneNumbersList: ElasticSipTrunking.PhoneNumber[] = [];
  const phoneNumbersDetailsList: string[] = [];

  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populatePhoneNumbersList(response, phoneNumbersList, phoneNumbersDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(phoneNumbersDetailsList.length > 0
      ? 'List of phone numbers:\n' + phoneNumbersDetailsList.join('\n')
      : 'Sorry, no phone numbers were found.');
  } else {
    printFullResponse(phoneNumbersList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const phoneNumber of elasticSipTrunkingService.phoneNumbers.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${phoneNumber.phoneNumber} - SIP trunk: ${phoneNumber.sipTrunkId}`);
    } else {
      console.log(phoneNumber);
    }
  }

})();
