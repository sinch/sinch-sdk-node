import { ElasticSipTrunking, PageResult } from '@sinch/sdk-core';
import {
  getCredentialListIdFromConfig,
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

const populateSipTrunksList = (
  sipTrunkPage: PageResult<ElasticSipTrunking.SipTrunk>,
  sipTrunksList: ElasticSipTrunking.SipTrunk[],
  sipTrunksDetailsList: string[],
) => {
  sipTrunkPage.data.map((sipTrunk: ElasticSipTrunking.SipTrunk) => {
    sipTrunksList.push(sipTrunk);
    sipTrunksDetailsList.push(`${sipTrunk.id} - ${sipTrunk.name}`);
  });
};

(async () => {
  console.log('**************************');
  console.log('* TrunksByCredentialList *');
  console.log('**************************');

  const credentialListId = getCredentialListIdFromConfig();

  const requestData: ElasticSipTrunking.ListTrunksForCredentialListRequestData = {
    id: credentialListId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await elasticSipTrunkingService.credentialLists.listTrunks(requestData);

  const sipTrunksList: ElasticSipTrunking.SipTrunk[] = [];
  const sipTrunksDetailsList: string[] = [];

  // Loop on all the pages to get all the SPI trunk using the specified credential list
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateSipTrunksList(response, sipTrunksList, sipTrunksDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(sipTrunksDetailsList.length > 0
      ? `List of SIP trunks using the credential list with ID '${requestData.id}':\n` + sipTrunksDetailsList.join('\n')
      : `Sorry, no SIP trunks using the credential list with ID '${requestData.id}' were found.`);
  } else {
    printFullResponse(sipTrunksList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const sipTrunk of elasticSipTrunkingService.credentialLists.listTrunks(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${sipTrunk.id} - ${sipTrunk.name}`);
    } else {
      console.log(sipTrunk);
    }
  }

})();
