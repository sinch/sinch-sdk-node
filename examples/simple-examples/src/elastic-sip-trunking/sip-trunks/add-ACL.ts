import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getAccessControlListIdFromConfig,
  getPrintFormat,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*******************************');
  console.log('* addAccessControlListToTrunk *');
  console.log('*******************************');

  const sipTrunkId = getSipTrunkIdFromConfig();
  const aclId = getAccessControlListIdFromConfig();

  const requestData: ElasticSipTrunking.AddAccessControlListToTrunkRequestData = {
    trunkId: sipTrunkId,
    addAccessControlListToTrunkRequestBody: {
      accessControlListIds: [
        aclId,
      ],
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.sipTrunks.addAccessControlList(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The SIP trunk with the id '${requestData.trunkId}' contains the following ACL IDs:\n - ${response.accessControlListIds?.join('\n - ')}`);
  } else {
    printFullResponse(response);
  }

})();
