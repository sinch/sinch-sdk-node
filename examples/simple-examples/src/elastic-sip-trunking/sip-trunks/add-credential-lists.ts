import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getCredentialListIdFromConfig,
  getPrintFormat,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('****************************');
  console.log('* addCredentialListToTrunk *');
  console.log('****************************');

  const sipTrunkId = getSipTrunkIdFromConfig();
  const credentialListId = getCredentialListIdFromConfig();

  const requestData: ElasticSipTrunking.AddCredentialListIdsToTrunkRequestData = {
    trunkId: sipTrunkId,
    addCredentialListIdsToTrunkRequestBody: {
      credentialListIds: [
        credentialListId,
      ],
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.sipTrunks.addCredentialLists(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The SIP trunk with the id '${requestData.trunkId}' contains the following credential list IDs:\n - ${response.credentialListIds?.join('\n - ')}`);
  } else {
    printFullResponse(response);
  }

})();
