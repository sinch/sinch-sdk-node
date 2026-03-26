import { ElasticSipTrunking } from '@sinch/sdk-core';
import { getCallBlockingRuleIdFromConfig, initElasticSipTrunkingService } from '../../config';

(async () => {
  console.log('**************************');
  console.log('* DeleteBlockingRuleById *');
  console.log('**************************');

  const callBlockingRuleId = getCallBlockingRuleIdFromConfig();

  const requestData: ElasticSipTrunking.DeleteBlockingRuleRequestData = {
    id: callBlockingRuleId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  await elasticSipTrunkingService.callBlockingRules.delete(requestData);

  console.log(`The call blocking rule with the id '${requestData.id}' has been deleted.`);

})();
