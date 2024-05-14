import { ElasticSipTrunking, PageResult } from '@sinch/sdk-core';
import {
  getAccessControlListIdFromConfig,
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

const populateIpRangesList = (
  ipRangePage: PageResult<ElasticSipTrunking.IpRange>,
  ipRangeList: ElasticSipTrunking.IpRange[],
  ipRangeDetailsList: string[],
) => {
  ipRangePage.data.map((ipRange: ElasticSipTrunking.IpRange) => {
    ipRangeList.push(ipRange);
    ipRangeDetailsList.push(`${ipRange.id} - ${ipRange.description}`);
  });
};

(async () => {
  console.log('***********************************');
  console.log('* getIpRangesForAccessControlList *');
  console.log('***********************************');

  const aclId = getAccessControlListIdFromConfig();

  const requestData: ElasticSipTrunking.ListIpRangesForAccessControlListRequestData = {
    accessControlListId: aclId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await elasticSipTrunkingService.accessControlList.listIpRanges(requestData);

  const ipRangesList: ElasticSipTrunking.IpRange[] = [];
  const ipRangeDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateIpRangesList(response, ipRangesList, ipRangeDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(ipRangeDetailsList.length > 0
      ? 'List of IP ranges:\n' + ipRangeDetailsList.join('\n')
      : 'Sorry, no IP ranges were found.');
  } else {
    printFullResponse(ipRangesList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const acl of elasticSipTrunkingService.accessControlList.listIpRanges(requestData)) {
    console.log(acl);
  }

})();
