import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getCredentialListIdFromConfig,
  getESTCredentialUsernameFromConfig,
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('********************');
  console.log('* UpdateCredential *');
  console.log('********************');

  const credentialListId = getCredentialListIdFromConfig();
  const credentialUsername = getESTCredentialUsernameFromConfig();

  const requestData: ElasticSipTrunking.UpdateCredentialRequestData = {
    id: credentialListId,
    username: credentialUsername,
    updateCredentialPasswordRequestBody: {
      password: 'newSecurePassword123[]',
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.credentialLists.updateCredential(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The credential with the id '${response.id}' and username '${response.username}' has been updated with a new password.'`);
  } else {
    printFullResponse(response);
  }

})();
