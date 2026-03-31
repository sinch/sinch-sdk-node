import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getCredentialListIdFromConfig,
  getESTCredentialUsernameFromConfig,
  initElasticSipTrunkingService,
} from '../../config';

(async () => {
  console.log('********************');
  console.log('* DeleteCredential *');
  console.log('********************');

  const credentialListId = getCredentialListIdFromConfig();
  const credentialUsername = getESTCredentialUsernameFromConfig();

  const requestData: ElasticSipTrunking.DeleteCredentialRequestData = {
    id: credentialListId,
    username: credentialUsername,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  await elasticSipTrunkingService.credentialLists.deleteCredential(requestData);

  console.log(`The credential with username '${requestData.username}' has been deleted from the credential list with the id '${requestData.id}'.`);

})();
