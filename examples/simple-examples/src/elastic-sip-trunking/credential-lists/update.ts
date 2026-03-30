import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getCredentialListIdFromConfig,
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('************************');
  console.log('* UpdateCredentialList *');
  console.log('************************');

  const credentialListId = getCredentialListIdFromConfig();

  const requestData: ElasticSipTrunking.UpdateCredentialListRequestData = {
    id: credentialListId,
    updateCredentialListRequestBody: {
      name: 'Updated credential list name',
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.credentialLists.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The credential list with the id '${response.id}' has been updated at '${response.updateTime?.toISOString()}'. Its new name is '${response.name}'`);
  } else {
    printFullResponse(response);
  }

})();
