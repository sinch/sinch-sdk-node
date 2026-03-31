import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getCallBlockingRuleIdFromConfig,
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**************************');
  console.log('* UpdateBlockingRuleById *');
  console.log('**************************');

  const callBlockingRuleId = getCallBlockingRuleIdFromConfig();

  const requestData: ElasticSipTrunking.UpdateBlockingRuleRequestData = {
    id: callBlockingRuleId,
    updateCallBlockingRuleRequestBody: {
      name: 'Updated blocking rule name: block inbound calls from US starting with 000',
      direction: 'INBOUND',
      callerCountry: 'US',
      callerMatch: '000',
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.callBlockingRules.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The call blocking rule with the id '${response.id}' has been updated at '${response.updateTime?.toISOString()}'. Its new name is '${response.name}'`);
  } else {
    printFullResponse(response);
  }

})();
