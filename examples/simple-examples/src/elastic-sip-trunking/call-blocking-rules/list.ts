import { ElasticSipTrunking, PageResult } from '@sinch/sdk-core';
import { getPrintFormat, initElasticSipTrunkingService, printFullResponse } from '../../config';

const populateCallBlockingRulesList = (
  callBlockingRulePage: PageResult<ElasticSipTrunking.CallBlockingRule>,
  callBlockingRulesList: ElasticSipTrunking.CallBlockingRule[],
  callBlockingRulesDetailsList: string[],
) => {
  callBlockingRulePage.data.map((callBlockingRule: ElasticSipTrunking.CallBlockingRule) => {
    callBlockingRulesList.push(callBlockingRule);
    callBlockingRulesDetailsList.push(`${callBlockingRule.id} - ${callBlockingRule.name}`);
  });
};

(async () => {
  console.log('********************');
  console.log('* GetBlockingRules *');
  console.log('********************');

  const requestData: ElasticSipTrunking.ListBlockingRulesRequestData = {};

  const elasticSipTrunkingService = initElasticSipTrunkingService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await elasticSipTrunkingService.callBlockingRules.list(requestData);

  const callBlockingRulesList: ElasticSipTrunking.CallBlockingRule[] = [];
  const callBlockingRulesDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateCallBlockingRulesList(response, callBlockingRulesList, callBlockingRulesDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(callBlockingRulesDetailsList.length > 0
      ? 'List of call blocking rules:\n' + callBlockingRulesDetailsList.join('\n')
      : 'Sorry, no call blocking rules were found.');
  } else {
    printFullResponse(callBlockingRulesList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const callBlockingRule of elasticSipTrunkingService.callBlockingRules.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${callBlockingRule.id} - ${callBlockingRule.name}`);
    } else {
      console.log(callBlockingRule);
    }
  }

})();
