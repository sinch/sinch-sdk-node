import { ElasticSipTrunking } from '@sinch/sdk-core';
import { getPrintFormat, initElasticSipTrunkingService, printFullResponse } from '../../config';

(async () => {
  console.log('************************');
  console.log('* CreateCredentialList *');
  console.log('************************');

  const requestData: ElasticSipTrunking.CreateCredentialListRequestData = {
    createCredentialListRequestBody: {
      name: 'My credential list created by the Node.js SDK',
      credentials: [
        {
          username: 'Username1-SDK',
          password: 'SecurePassword!234',
        },
        {
          username: 'Username2-SDK',
          password: 'SecurePa$$word5678',
        },
      ],
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.credentialLists.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New credential list created with the id '${response.id}'`);
  } else {
    printFullResponse(response);
  }

})();
