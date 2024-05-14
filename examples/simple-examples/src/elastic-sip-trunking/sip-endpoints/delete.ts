import { ElasticSipTrunking } from '@sinch/sdk-core';
import { getSipEndpointIdFromConfig, getSipTrunkIdFromConfig, initElasticSipTrunkingService } from '../../config';

(async () => {
  console.log('*********************');
  console.log('* deleteSipEndpoint *');
  console.log('*********************');

  const sipTrunkId = getSipTrunkIdFromConfig();
  const sipEndpointId = getSipEndpointIdFromConfig();

  const requestData: ElasticSipTrunking.DeleteSipEndpointRequestData = {
    sipTrunkId,
    sipEndpointId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  await elasticSipTrunkingService.sipEndpoints.delete(requestData);

  console.log(`The SIP Endpoint with the id '${requestData.sipEndpointId}' has been deleted.`);

})();
