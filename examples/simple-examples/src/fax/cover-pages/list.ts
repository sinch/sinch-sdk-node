import { Fax, PageResult } from '@sinch/sdk-core';
import { getFaxServiceIdFromConfig, getPrintFormat, initFaxService, printFullResponse } from '../../config';

const populateCoverPagesList = (
  coverPagesPage: PageResult<Fax.CoverPage>,
  fullCoverPagesList: Fax.CoverPage[],
  coverPagesList: string[],
) => {
  fullCoverPagesList.push(...coverPagesPage.data);
  coverPagesPage.data.map((coverPage) =>  {
    coverPagesList.push(`Cover Page ID: '${coverPage.id} - Cover Page name: '${coverPage.name}'`);
  });
};

(async () => {
  console.log('******************');
  console.log('* ListCoverPages *');
  console.log('******************');

  const serviceId = getFaxServiceIdFromConfig();

  const requestData: Fax.ListCoverPagesRequestData = {
    serviceId,
    pageSize: 1,
  };

  const faxService = initFaxService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await faxService.coverPages.list(requestData);

  // Init data structure to hold the response content
  const fullCoverPagesList: Fax.CoverPage[] = [];
  // Init data structure to hold the response content for pretty print
  const coverPagesList: string[] = [];

  // Loop on all the pages to get all the cover pages
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateCoverPagesList(response, fullCoverPagesList, coverPagesList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(coverPagesList.length > 0
      ? `List of cover pages:\n${coverPagesList.join('\n')}`
      : 'Sorry, no cover pages were found');
  } else {
    printFullResponse(fullCoverPagesList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const coverPage of faxService.coverPages.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Cover Page ID: '${coverPage.id} - Cover Page name: '${coverPage.name}'`);
    } else {
      console.log(coverPage);
    }
  }
})();
