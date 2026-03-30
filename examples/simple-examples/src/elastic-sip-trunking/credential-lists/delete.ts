import { ElasticSipTrunking } from '@sinch/sdk-core';
import { getCredentialListIdFromConfig, initElasticSipTrunkingService } from '../../config';

(async () => {
  console.log('************************');
  console.log('* DeleteCredentialList *');
  console.log('************************');

  const credentialListId = getCredentialListIdFromConfig();

  const requestData: ElasticSipTrunking.DeleteCredentialListRequestData = {
    id: credentialListId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  await elasticSipTrunkingService.credentialLists.delete(requestData);

  console.log(`The credential list with the id '${requestData.id}' has been deleted.`);

})();
