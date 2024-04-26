import { ElasticSipTrunking } from '@sinch/sdk-core';
import { getAccessControlListIdFromConfig, initElasticSipTrunkingService } from '../../config';

(async () => {
  console.log('***************************');
  console.log('* deleteAccessControlList *');
  console.log('***************************');

  const aclId = getAccessControlListIdFromConfig();

  const requestData: ElasticSipTrunking.DeleteAccessControlListRequestData = {
    id: aclId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  await elasticSipTrunkingService.accessControlList.delete(requestData);

  console.log(`The SIP trunk with the id '${requestData.id}' has been deleted.`);

})();
