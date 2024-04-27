import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getElasticSipTrunkEnabledPhoneNumberFromConfig,
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**************************');
  console.log('* GetPhoneNumberByNumber *');
  console.log('**************************');

  const phoneNumber = getElasticSipTrunkEnabledPhoneNumberFromConfig();

  const requestData: ElasticSipTrunking.GetPhoneNumberRequestData = {
    phoneNumber,
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.phoneNumbers.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The Phone Number '${response.phoneNumber}' has the ID '${response.id}' and has been created at '${response.createTime?.toISOString()}'`);
  } else {
    printFullResponse(response);
  }

})();
