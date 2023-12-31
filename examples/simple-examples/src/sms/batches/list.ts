import { getPrintFormat, initSmsClient, printFullResponse } from '../../config';
import { ApiBatchListBatchesInner, ListBatchesRequestData, PageResult } from '@sinch/sdk-core';

const populateBatchesList = (
  batchListPage: PageResult<ApiBatchListBatchesInner>,
  fullBatchesList: ApiBatchListBatchesInner[],
  batchesList: string[],
) => {
  fullBatchesList.push(...batchListPage.data);
  batchListPage.data.map((batch) => {
    batchesList.push(`Batch ID: ${batch.id} - Type: ${batch.type} - From: ${batch.from}`);
  });
};

(async () => {
  console.log('***************');
  console.log('* ListBatches *');
  console.log('***************');

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  oneWeekAgo.setHours(0, 0, 0, 0);

  const requestData: ListBatchesRequestData= {
    start_date: oneWeekAgo,
    page_size: 2,
  };

  const sinchClient = initSmsClient();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await sinchClient.sms.batches.list(requestData);

  const fullBatchesList: ApiBatchListBatchesInner[] = [];
  const batchesList: string[] = [];

  // Loop on all the pages to get all the batches
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateBatchesList(response, fullBatchesList, batchesList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(batchesList.length > 0
      ? 'List of batches: ' + JSON.stringify(batchesList, null, 2)
      : 'Sorry, no batches were found.');
  } else {
    printFullResponse(fullBatchesList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const batch of sinchClient.sms.batches.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Batch ID: ${batch.id} - Type: ${batch.type} - From: ${batch.from}`);
    } else {
      console.log(batch);
    }
  }
})();
