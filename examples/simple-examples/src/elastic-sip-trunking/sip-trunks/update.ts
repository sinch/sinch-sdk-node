import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('******************');
  console.log('* updateSipTrunk *');
  console.log('******************');

  const sipTrunkId = getSipTrunkIdFromConfig();

  const requestData: ElasticSipTrunking.UpdateSipTrunkRequestData = {
    sipTrunkId,
    updateSipTrunkRequestBody: {
      name: 'Node.js SDK Sinch Trunk Reloaded',
      hostName: 'node-js-sdk-sinch-reloaded',
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.sipTrunks.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The SIP trunk with the id '${response.id}' has been updated at '${response.updateTime?.toISOString()}'. Its new name is '${response.name}'`);
  } else {
    printFullResponse(response);
  }

})();
