import { ElasticSipTrunking, PageResult } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

const populateSipEndpointsList = (
  sipEndpointPage: PageResult<ElasticSipTrunking.SipEndpoint>,
  sipEndpointsList: ElasticSipTrunking.SipEndpoint[],
  sipEndpointsDetailsList: string[],
) => {
  sipEndpointPage.data.map((sipEndpoint: ElasticSipTrunking.SipEndpoint) => {
    sipEndpointsList.push(sipEndpoint);
    sipEndpointsDetailsList.push(`${sipEndpoint.id} - ${sipEndpoint.name}`);
  });
};

(async () => {
  console.log('*******************');
  console.log('* getSipEndpoints *');
  console.log('*******************');

  const sipTrunkId = getSipTrunkIdFromConfig();

  const requestData: ElasticSipTrunking.ListSipEndpointsRequestData = {
    sipTrunkId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await elasticSipTrunkingService.sipEndpoints.list(requestData);

  const sipEndpointsList: ElasticSipTrunking.SipEndpoint[] = [];
  const sipEndpointsDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateSipEndpointsList(response, sipEndpointsList, sipEndpointsDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(sipEndpointsDetailsList.length > 0
      ? 'List of SIP Endpoints:\n' + sipEndpointsDetailsList.join('\n')
      : 'Sorry, no SIP Endpoints were found.');
  } else {
    printFullResponse(sipEndpointsList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const sipEndpoint of elasticSipTrunkingService.sipEndpoints.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${sipEndpoint.id} - ${sipEndpoint.name}`);
    } else {
      console.log(sipEndpoint);
    }
  }

})();
