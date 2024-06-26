import {
  Fax,
  PageResult,
} from '@sinch/sdk-core';
import { getFaxEmailFromConfig, getPrintFormat, initFaxService, printFullResponse } from '../../config';

const populateServiceNumbersList = (
  serviceNumbersPage: PageResult<Fax.ServicePhoneNumber>,
  fullServiceNumbersList: Fax.ServicePhoneNumber[],
  serviceNumbersList: string[],
) => {
  fullServiceNumbersList.push(...serviceNumbersPage.data);
  serviceNumbersPage.data.map((number) =>  {
    serviceNumbersList.push(`Phone numbers: '${number.phoneNumber}'`);
  });
};

(async () => {
  console.log('*********************');
  console.log('* getNumbersByEmail *');
  console.log('*********************');

  const email = getFaxEmailFromConfig();

  const requestData: Fax.ListNumbersByEmailRequestData = {
    email,
    pageSize: 2,
  };

  const faxService = initFaxService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await faxService.emails.listNumbers(requestData);

  // Init data structure to hold the response content
  const fullServiceNumbersList: Fax.ServicePhoneNumber[] = [];
  // Init data structure to hold the response content for pretty print
  const serviceNumbersList: string[] = [];

  // Loop on all the pages to get all the numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateServiceNumbersList(response, fullServiceNumbersList, serviceNumbersList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(serviceNumbersList.length > 0
      ? `List of configured numbers for the email '${requestData.email}':\n${serviceNumbersList.join('\n')}`
      : 'Sorry, no numbers were found');
  } else {
    printFullResponse(fullServiceNumbersList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const number of faxService.emails.listNumbers(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Phone numbers: '${number.phoneNumber}'`);
    } else {
      console.log(number);
    }
  }
})();
