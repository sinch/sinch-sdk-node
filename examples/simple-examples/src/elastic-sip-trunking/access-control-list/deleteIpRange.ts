import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getAccessControlListIdFromConfig,
  getIpRangeIdFromConfig,
  initElasticSipTrunkingService,
} from '../../config';

(async () => {
  console.log('**************************************');
  console.log('* deleteIpRangeFromAccessControlList *');
  console.log('**************************************');

  const aclId = getAccessControlListIdFromConfig();
  const ipRangeId = getIpRangeIdFromConfig();

  const requestData: ElasticSipTrunking.DeleteIpRangeFromAccessControlListRequestData = {
    accessControlListId: aclId,
    ipRangeId: ipRangeId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  await elasticSipTrunkingService.accessControlList.deleteIpRange(requestData);

  console.log(`The IP range '${requestData.ipRangeId}' has been removed fromm the ACL '${requestData.accessControlListId}'`);

})();
