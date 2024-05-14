import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getSipTrunkIdFromConfig,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*******************');
  console.log('* getSipTrunkById *');
  console.log('*******************');

  const sipTrunkId = getSipTrunkIdFromConfig();

  const requestData: ElasticSipTrunking.GetSipTrunkRequestData = {
    sipTrunkId,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.sipTrunks.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The SIP trunk with the id '${response.id}' is named '${response.name}' and has been created at '${response.createTime?.toISOString()}'`);
  } else {
    printFullResponse(response);
  }

})();
