import { Fax } from '@sinch/sdk-core';
import {
  getFaxServiceIdFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  initFaxService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**********************');
  console.log('* getEmailsForNumber *');
  console.log('**********************');

  const phoneNumber = getPhoneNumberFromConfig();
  const serviceId = getFaxServiceIdFromConfig();

  const requestData: Fax.ListEmailsForNumberRequestData = {
    phoneNumber,
    serviceId,
    pageSize: 2,
  };

  const faxService = initFaxService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await faxService.services.listEmailsForNumber(requestData);

  // Init data structure to hold the response content
  const emailsList: string[] = [];

  // Loop on all the pages to get all the numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    emailsList.push(...response.data);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(emailsList.length > 0
      ? `List of emails:\n${emailsList.join('\n')}`
      : 'Sorry, no emails were found');
  } else {
    printFullResponse(response);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const email of faxService.services.listEmailsForNumber(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Email: '${email}'`);
    } else {
      console.log(email);
    }
  }
})();
