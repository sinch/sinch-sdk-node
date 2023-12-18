import { getPrintFormat, initClient, printFullResponse } from '../../config';
import { ActiveNumber, ListActiveNumbersRequestData, PageResult } from '@sinch/sdk-core';

const populateActiveNumbersList = (
  activeNumbersPage: PageResult<ActiveNumber>,
  activeNumbersList: ActiveNumber[],
  phoneNumbersList: (string | undefined)[],
) => {
  activeNumbersPage.data?.map((activeNumber: ActiveNumber) => {
    activeNumbersList.push(activeNumber);
    phoneNumbersList.push(activeNumber.phoneNumber);
  });
};


(async () => {
  console.log('***********************************');
  console.log('* NumberService_ListActiveNumbers *');
  console.log('***********************************');

  const requestData: ListActiveNumbersRequestData = {
    regionCode: 'US',
    type: 'LOCAL',
    pageSize: 2,
  };

  const sinchClient = initClient();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await sinchClient.numbers.activeNumber.list(requestData);

  const activeNumbersList: ActiveNumber[] = [];
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
  for await (const activeNumber of sinchClient.numbers.activeNumber.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(activeNumber.phoneNumber);
    } else {
      console.log(activeNumber);
    }
  }

})();

