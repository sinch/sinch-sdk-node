import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*********************');
  console.log('* createSipEndpoint *');
  console.log('*********************');

  const sipTrunkId = getSipTrunkIdFromConfig();

  const requestData: ElasticSipTrunking.CreateSipEndpointRequestData = {
    sipTrunkId,
    createSipEndpointRequestBody: {
      name: 'Acme Endpoint',
      address: '127.0.0.1',
      priority: 1,
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.sipEndpoints.create(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New SIP Endpoint created with the id '${response.id}' at '${response.createTime}'`);
  } else {
    printFullResponse(response);
  }

})();
