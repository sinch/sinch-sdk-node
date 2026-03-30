import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getCredentialListIdFromConfig,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
} from '../../config';

(async () => {
  console.log('*********************************');
  console.log('* removeCredentialListFromTrunk *');
  console.log('*********************************');

  const sipTrunkId = getSipTrunkIdFromConfig();
  const credentialListId = getCredentialListIdFromConfig();

  const requestData: ElasticSipTrunking.DeleteCredentialListFromTrunkRequestData = {
    trunkId: sipTrunkId,
    credentialListId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  await elasticSipTrunkingService.sipTrunks.deleteCredentialList(requestData);

  console.log(`The credential list '${requestData.credentialListId}' has been removed fromm the SIP trunk '${requestData.trunkId}'`);

})();
