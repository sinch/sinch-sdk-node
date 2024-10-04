import { ElasticSipTrunking, PageResult } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

const populateCallsList = (
  callsPage: PageResult<ElasticSipTrunking.Call>,
  callsList: ElasticSipTrunking.Call[],
  callsDetailsList: string[],
) => {
  callsPage.data.map((call: ElasticSipTrunking.Call) => {
    callsList.push(call);
    callsDetailsList.push(`${call.callId} - From: ${call.from} - To: ${call.to}`);
  });
};

(async () => {
  console.log('*************');
  console.log('* findCalls *');
  console.log('*************');

  const trunkId = getSipTrunkIdFromConfig();

  const requestData: ElasticSipTrunking.FindCallsRequestData = {
    trunkId,
    callResult: 'COMPLETED',
    direction: 'inbound',
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await elasticSipTrunkingService.calls.find(requestData);

  const callsList: ElasticSipTrunking.Call[] = [];
  const callsDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateCallsList(response, callsList, callsDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(callsDetailsList.length > 0
      ? 'List of calls found:\n' + callsDetailsList.join('\n')
      : 'Sorry, no calls were found.');
  } else {
    printFullResponse(callsList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const call of elasticSipTrunkingService.calls.find(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${call.callId} - From: ${call.from} - To: ${call.to}`);
    } else {
      console.log(call);
    }
  }

})();
