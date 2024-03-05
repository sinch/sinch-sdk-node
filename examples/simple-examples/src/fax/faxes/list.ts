import { Fax, ListFaxesRequestData, PageResult } from '@sinch/sdk-core';
import { getPrintFormat, initClient, printFullResponse } from '../../config';

const populateFaxesList = (
  faxPage: PageResult<Fax>,
  fullFaxesList: Fax[],
  faxesList: string[],
) => {
  fullFaxesList.push(...faxPage.data);
  faxPage.data.map((fax) =>  {
    faxesList.push(`Fax ID: '${fax.id}' - Created at: '${fax.createTime}' - Status: '${fax.status}'`);
  });
};

(async () => {
  console.log('************');
  console.log('* getFaxes *');
  console.log('************');

  const requestData: ListFaxesRequestData = {
    pageSize: 2,
  };

  const sinchClient = initClient();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await sinchClient.fax.faxes.list(requestData);

  // Init data structure to hold the response content
  const fullFaxesList: Fax[] = [];
  // Init data structure to hold the response content for pretty print
  const faxesList: string[] = [];

  // Loop on all the pages to get all the faxes
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateFaxesList(response, fullFaxesList, faxesList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(faxesList.length > 0
      ? `List of faxes:\n${faxesList.join('\n')}`
      : 'Sorry, no faxes were found');
  } else {
    printFullResponse(response);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const fax of sinchClient.fax.faxes.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Fax ID: '${fax.id}' - Created at: '${fax.createTime}' - Status: '${fax.status}'`);
    } else {
      console.log(fax);
    }
  }
})();
