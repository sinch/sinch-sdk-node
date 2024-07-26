import { getPrintFormat, initNumbersService, printFullResponse } from '../../config';
import { Numbers, PageResult } from '@sinch/sdk-core';

const populateActiveNumbersList = (
  activeNumbersPage: PageResult<Numbers.ActiveNumber>,
  activeNumbersList: Numbers.ActiveNumber[],
  phoneNumbersList: (string | undefined)[],
) => {
  activeNumbersPage.data?.map((activeNumber: Numbers.ActiveNumber) => {
    activeNumbersList.push(activeNumber);
    phoneNumbersList.push(`${activeNumber.phoneNumber} - Voice Configuration: ${activeNumber.voiceConfiguration?.type}`);
  });
};


(async () => {
  console.log('***********************************');
  console.log('* NumberService_ListActiveNumbers *');
  console.log('***********************************');

  const requestData: Numbers.ListActiveNumbersRequestData = {
    regionCode: 'US',
    type: 'LOCAL',
    capability: 'SMS',
    pageSize: 2,
  };

  const numbersService = initNumbersService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await numbersService.list(requestData);

  const activeNumbersList: Numbers.ActiveNumber[] = [];
  const phoneNumbersList: (string | undefined)[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateActiveNumbersList(response, activeNumbersList, phoneNumbersList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(phoneNumbersList.length > 0
      ? 'List of active numbers: ' + JSON.stringify(phoneNumbersList, null, 2)
      : 'Sorry, no active numbers were found.');
  } else {
    printFullResponse(activeNumbersList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const activeNumber of numbersService.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${activeNumber.phoneNumber} - Voice Configuration: ${activeNumber.voiceConfiguration?.type}`);
    } else {
      console.log(activeNumber);
    }
  }

})();

