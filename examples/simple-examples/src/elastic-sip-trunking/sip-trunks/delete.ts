import { ElasticSipTrunking } from '@sinch/sdk-core';
import { getSipTrunkIdFromConfig, initElasticSipTrunkingService } from '../../config';

(async () => {
  console.log('******************');
  console.log('* deleteSipTrunk *');
  console.log('******************');

  const sipTrunkId = getSipTrunkIdFromConfig();

  const requestData: ElasticSipTrunking.DeleteSipTrunkRequestData = {
    sipTrunkId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  await elasticSipTrunkingService.sipTrunks.delete(requestData);

  console.log(`The SIP trunk with the id '${requestData.sipTrunkId}' has been deleted.`);

})();
