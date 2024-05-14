import { ElasticSipTrunking } from '@sinch/sdk-core';
import { getPrintFormat, initElasticSipTrunkingService, printFullResponse } from '../../config';

(async () => {
  console.log('***************************');
  console.log('* createAccessControlList *');
  console.log('***************************');

  const requestData: ElasticSipTrunking.CreateAccessControlListRequestData = {
    createAccessControlListBody: {
      name: 'New ACL created with the Node.js SDK',
      enabled: true,
      ipRanges: [
        {
          description: 'Location 1',
          ipAddress: '15.15.15.15',
          range: 20,
        },
      ],
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.accessControlList.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New access control list created with the id '${response.id}' at '${response.createTime?.toISOString()}'`);
  } else {
    printFullResponse(response);
  }

})();
