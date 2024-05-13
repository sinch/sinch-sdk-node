import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('************************');
  console.log('* getCountryPermission *');
  console.log('************************');

  const requestData: ElasticSipTrunking.GetCountryPermissionRequestData = {
    isoCode: 'US',
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.countryPermissions.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The country permission for the country '${response.name}' is ${response.enabled ? '' : 'not '}enabled`);
  } else {
    printFullResponse(response);
  }

})();
