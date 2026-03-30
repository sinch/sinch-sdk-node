import { ElasticSipTrunking } from '@sinch/sdk-core';
import { getPrintFormat, initElasticSipTrunkingService, printFullResponse } from '../../config';

(async () => {
  console.log('**********************');
  console.log('* CreateBlockingRule *');
  console.log('**********************');

  const requestData: ElasticSipTrunking.CreateBlockingRuleRequestData = {
    createCallBlockingRuleRequestBody: {
      direction: 'INBOUND',
      name: 'Block inbound calls from US starting with 123',
      callerCountry: 'US',
      callerMatch: '123',
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.callBlockingRules.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New call blocking rule created with the id '${response.id}'`);
  } else {
    printFullResponse(response);
  }

})();
