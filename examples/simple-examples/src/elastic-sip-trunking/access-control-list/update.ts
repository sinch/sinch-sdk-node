import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getAccessControlListIdFromConfig,
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('***************************');
  console.log('* updateAccessControlList *');
  console.log('***************************');

  const aclId = getAccessControlListIdFromConfig();

  const requestData: ElasticSipTrunking.UpdateAccessControlListRequestData = {
    id: aclId,
    updateAccessControlListRequestBody: {
      name: 'ACL updated with the Node.js SDK',
      enabled: false,
      ipRanges: [
        {
          description: 'Location 1 - updated',
          ipAddress: '15.15.15.16',
          range: 20,
        },
      ],
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.accessControlList.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The Access Control List with the id '${response.id}' has been updated at '${response.updateTime?.toISOString()}'. Its new name is '${response.name}'`);
  } else {
    printFullResponse(response);
  }

})();
