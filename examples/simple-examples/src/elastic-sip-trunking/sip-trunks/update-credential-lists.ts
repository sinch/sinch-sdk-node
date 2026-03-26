import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getCredentialListIdFromConfig,
  getPrintFormat,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*************************************');
  console.log('* bulkUpdateCredentialListsForTrunk *');
  console.log('*************************************');

  const sipTrunkId = getSipTrunkIdFromConfig();
  const credentialListId = getCredentialListIdFromConfig();

  const requestData: ElasticSipTrunking.UpdateCredentialListIdsForTrunkRequestData = {
    trunkId: sipTrunkId,
    updateCredentialListIdsForTrunkRequestBody: {
      credentialListIds: [
        credentialListId,
      ],
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.sipTrunks.updateCredentialLists(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The SIP trunk with the id '${requestData.trunkId}' has been updated the following credential list IDs:\n - ${response.credentialListIds?.join('\n - ')}`);
  } else {
    printFullResponse(response);
  }

})();
