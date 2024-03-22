import { ListNumbersForServiceRequestData, PageResult, ServicePhoneNumber } from '@sinch/sdk-core';
import { getFaxServiceIdFromConfig, getPrintFormat, initFaxService, printFullResponse } from '../../config';

const populateNumbersList = (
  numbersPage: PageResult<ServicePhoneNumber>,
  fullNumbersList: ServicePhoneNumber[],
  numbersList: string[],
) => {
  fullNumbersList.push(...numbersPage.data);
  numbersPage.data.map((servicePhoneNumber) =>  {
    numbersList.push(`Phone number: '${servicePhoneNumber.phoneNumber} - Service ID: '${servicePhoneNumber.serviceId}'`);
  });
};

(async () => {
  console.log('*************************');
  console.log('* listNumbersForService *');
  console.log('*************************');

  const serviceId = getFaxServiceIdFromConfig();

  const requestData: ListNumbersForServiceRequestData = {
    serviceId,
    pageSize: 2,
  };

  const faxService = initFaxService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await faxService.services.listNumbers(requestData);

  // Init data structure to hold the response content
  const fullNumbersList: ServicePhoneNumber[] = [];
  // Init data structure to hold the response content for pretty print
  const numbersList: string[] = [];

  // Loop on all the pages to get all the numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateNumbersList(response, fullNumbersList, numbersList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(numbersList.length > 0
      ? `List of numbers:\n${numbersList.join('\n')}`
      : 'Sorry, no numbers were found');
  } else {
    printFullResponse(fullNumbersList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const servicePhoneNumber of faxService.services.listNumbers(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Phone number: '${servicePhoneNumber.phoneNumber} - Service ID: '${servicePhoneNumber.serviceId}'`);
    } else {
      console.log(servicePhoneNumber);
    }
  }
})();
