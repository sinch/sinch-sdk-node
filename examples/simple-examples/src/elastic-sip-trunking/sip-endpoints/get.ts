import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getSipEndpointIdFromConfig,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**********************');
  console.log('* getSipEndpointById *');
  console.log('**********************');

  const sipTrunkId = getSipTrunkIdFromConfig();
  const sipEndpointId = getSipEndpointIdFromConfig();

  const requestData: ElasticSipTrunking.GetSipEndpointByIdRequestData = {
    sipTrunkId,
    sipEndpointId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.sipEndpoints.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The SIP Endpoint with the id '${response.id}' is named '${response.name}' and has been created at '${response.createTime?.toISOString()}'`);
  } else {
    printFullResponse(response);
  }

})();
