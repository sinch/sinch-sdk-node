import { ElasticSipTrunking, PageResult } from '@sinch/sdk-core';
import {
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

const populateCredentialListsList = (
  credentialListsPage: PageResult<ElasticSipTrunking.CredentialList>,
  credentialListsList: ElasticSipTrunking.CredentialList[],
  credentialListsDetailsList: string[],
) => {
  credentialListsPage.data.map((credentialList: ElasticSipTrunking.CredentialList) => {
    credentialListsList.push(credentialList);
    credentialListsDetailsList.push(`${credentialList.id} - ${credentialList.name}`);
  });
};

(async () => {
  console.log('**********************');
  console.log('* GetCredentialLists *');
  console.log('**********************');

  const requestData: ElasticSipTrunking.ListCredentialListsRequestData = {};

  const elasticSipTrunkingService = initElasticSipTrunkingService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await elasticSipTrunkingService.credentialLists.list(requestData);

  const credentialListsList: ElasticSipTrunking.CredentialList[] = [];
  const credentialListsDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateCredentialListsList(response, credentialListsList, credentialListsDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(credentialListsDetailsList.length > 0
      ? 'List of credential lists:\n' + credentialListsDetailsList.join('\n')
      : 'Sorry, no credential lists were found.');
  } else {
    printFullResponse(credentialListsList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const credentialList of elasticSipTrunkingService.credentialLists.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${credentialList.id} - ${credentialList.name}`);
    } else {
      console.log(credentialList);
    }
  }

})();
