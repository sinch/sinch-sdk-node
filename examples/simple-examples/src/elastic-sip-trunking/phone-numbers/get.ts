import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('******************');
  console.log('* GetPhoneNumber *');
  console.log('******************');

  const requestData: ElasticSipTrunking.GetPhoneNumberRequestData = {
    phoneNumber: getPhoneNumberFromConfig(),
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.phoneNumbers.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Phone number '${response.phoneNumber}' is assigned to SIP trunk '${response.sipTrunkId}' (${response.countryCode}).`);
  } else {
    printFullResponse(response);
  }

})();
