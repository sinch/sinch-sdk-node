import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getCredentialListIdFromConfig,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*************************');
  console.log('* GetCredentialListById *');
  console.log('*************************');

  const credentialListId = getCredentialListIdFromConfig();

  const requestData: ElasticSipTrunking.GetCredentialListRequestData = {
    id: credentialListId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.credentialLists.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The credential list with the id '${response.id}' is named '${response.name}' and contains ${response.credentials.length} credentials.`);
  } else {
    printFullResponse(response);
  }

})();
