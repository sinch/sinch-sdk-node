import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getAccessControlListIdFromConfig, getIpRangeIdFromConfig,
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**************************************');
  console.log('* updateIpRangeFromAccessControlList *');
  console.log('**************************************');

  const aclId = getAccessControlListIdFromConfig();
  const ipRangeId = getIpRangeIdFromConfig();

  const requestData: ElasticSipTrunking.UpdateIpRangeFromAccessControlListRequestData = {
    accessControlListId: aclId,
    ipRangeId,
    updateIpRangeRequestBody: {
      description: 'IP range updated with the Node.js SDK',
      ipAddress: '11.12.13.15',
      range: 27,
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.accessControlList.updateIpRange(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The IP range with the ID ${response.id} associated to the ACL '${response.accessControlListId}' has been updated at ${response.updateTime?.toISOString()}`);
  } else {
    printFullResponse(response);
  }

})();
