import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getPrintFormat, getSipEndpointIdFromConfig,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*********************');
  console.log('* updateSipEndpoint *');
  console.log('*********************');

  const sipTrunkId = getSipTrunkIdFromConfig();
  const sipEndpointId = getSipEndpointIdFromConfig();

  const requestData: ElasticSipTrunking.UpdateSipEndpointRequestData = {
    sipTrunkId,
    sipEndpointId,
    updateSipEndpointRequestBody: {
      name: 'Node.js SDK Sinch Endpoint Reloaded',
      address: '127.0.0.1',
      priority: 1,
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.sipEndpoints.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The SIP Endpoint with the ID '${response.id}' has been updated at '${response.updateTime?.toISOString()}'. Its new name is '${response.name}'`);
  } else {
    printFullResponse(response);
  }

})();
