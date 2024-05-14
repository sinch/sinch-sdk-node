import { ElasticSipTrunking } from '@sinch/sdk-core';
import { getPrintFormat, initElasticSipTrunkingService, printFullResponse } from '../../config';

(async () => {
  console.log('******************');
  console.log('* createSipTrunk *');
  console.log('******************');

  const requestData: ElasticSipTrunking.CreateSipTrunkRequestData = {
    createSipTrunkRequestBody: {
      name: 'Node.js SDK Sinch Trunk',
      hostName: 'node-js-sdk-sinch',
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.sipTrunks.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New SIP trunk created with the id '${response.id}'`);
  } else {
    printFullResponse(response);
  }

})();
