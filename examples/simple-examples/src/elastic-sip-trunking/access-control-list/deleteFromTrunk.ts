import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getAccessControlListIdFromConfig,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
} from '../../config';

(async () => {
  console.log('************************************');
  console.log('* deleteAccessControlListFromTrunk *');
  console.log('************************************');

  const sipTrunkId = getSipTrunkIdFromConfig();
  const aclId = getAccessControlListIdFromConfig();

  const requestData: ElasticSipTrunking.DeleteAccessControlListFromTrunkRequestData = {
    trunkId: sipTrunkId,
    accessControlListId: aclId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  await elasticSipTrunkingService.accessControlList.deleteFromTrunk(requestData);

  console.log(`The ACL '${requestData.accessControlListId}' has been removed fromm the SIP trunk '${requestData.trunkId}'`);

})();
