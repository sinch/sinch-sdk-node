import { ElasticSipTrunking, PageResult } from '@sinch/sdk-core';
import { getPrintFormat, initElasticSipTrunkingService, printFullResponse } from '../../config';

const populateACLsList = (
  aclPage: PageResult<ElasticSipTrunking.AccessControlList>,
  aclsList: ElasticSipTrunking.AccessControlList[],
  aclsDetailsList: string[],
) => {
  aclPage.data.map((acl: ElasticSipTrunking.AccessControlList) => {
    aclsList.push(acl);
    aclsDetailsList.push(`${acl.id} - ${acl.name}`);
  });
};

(async () => {
  console.log('************************');
  console.log('* getAccessControlList *');
  console.log('************************');

  const requestData: ElasticSipTrunking.ListAccessControlListRequestData = {};

  const elasticSipTrunkingService = initElasticSipTrunkingService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await elasticSipTrunkingService.accessControlList.list(requestData);
  const aclsList: ElasticSipTrunking.AccessControlList[] = [];
  const aclsDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateACLsList(response, aclsList, aclsDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(aclsDetailsList.length > 0
      ? 'List of ACLs:\n' + aclsDetailsList.join('\n')
      : 'Sorry, no ACLs were found.');
  } else {
    printFullResponse(aclsList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const acl of elasticSipTrunkingService.accessControlList.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${acl.id} - ${acl.name}`);
    } else {
      console.log(acl);
    }
  }

})();
