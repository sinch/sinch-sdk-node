import { ElasticSipTrunking } from '@sinch/sdk-core';
import { getSipTrunkIdFromConfig, initElasticSipTrunkingService, printFullResponse } from '../../config';

(async () => {
  console.log('*********************************');
  console.log('* getAccessControlListsForTrunk *');
  console.log('*********************************');

  const sipTrunkId = getSipTrunkIdFromConfig();

  const requestData: ElasticSipTrunking.ListAccessControlListsForTrunkRequestData = {
    trunkId: sipTrunkId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await elasticSipTrunkingService.sipTrunks.listAccessControlLists(requestData);

  const aclList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    aclList.push(...response.data);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  printFullResponse(aclList);

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const acl of elasticSipTrunkingService.sipTrunks.listAccessControlLists(requestData)) {
    console.log(acl);
  }

})();
