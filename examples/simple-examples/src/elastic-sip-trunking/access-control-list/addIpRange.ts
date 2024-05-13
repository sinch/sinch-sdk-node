import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getAccessControlListIdFromConfig,
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*******************************');
  console.log('* addAccessControlListToTrunk *');
  console.log('*******************************');

  const aclId = getAccessControlListIdFromConfig();

  const requestData: ElasticSipTrunking.AddIpRangeToAccessControlListRequestData = {
    accessControlListId: aclId,
    addIpRangeRequestBody: {
      description: 'IP range to add with the Node.js SDK',
      ipAddress: '11.12.13.14',
      range: 27,
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.accessControlList.addIpRange(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The IP range with the ID ${response.id} associated to the ACL '${response.accessControlListId}' has been created at ${response.createTime?.toISOString()}`);
  } else {
    printFullResponse(response);
  }

})();
