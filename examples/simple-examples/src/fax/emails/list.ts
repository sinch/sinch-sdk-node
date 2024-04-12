import { Fax, PageResult } from '@sinch/sdk-core';
import { getPrintFormat, initFaxService, printFullResponse } from '../../config';

const populateEmailsList = (
  emailsPage: PageResult<Fax.Email>,
  fullEmailsList: Fax.Email[],
  emailsList: string[],
) => {
  fullEmailsList.push(...emailsPage.data);
  emailsPage.data.map((email) =>  {
    emailsList.push(`Email '${email.email}' - Phone numbers: '${email.phoneNumbers?.join(', ')}'`);
  });
};

(async () => {
  console.log('***********************');
  console.log('* getEmailsForProject *');
  console.log('***********************');

  const requestData: Fax.ListEmailsForProjectRequestData = {
    pageSize: 2,
  };

  const faxService = initFaxService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await faxService.emails.list(requestData);

  // Init data structure to hold the response content
  const fullEmailsList: Fax.Email[] = [];
  // Init data structure to hold the response content for pretty print
  const emailsList: string[] = [];

  // Loop on all the pages to get all the emails
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateEmailsList(response, fullEmailsList, emailsList);
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
    printFullResponse(fullEmailsList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const email of faxService.emails.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Email '${email.email}' - Phone numbers: '${email.phoneNumbers?.join(', ')}'`);
    } else {
      console.log(email);
    }
  }
})();
