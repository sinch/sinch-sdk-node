import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getAccessControlListIdFromConfig,
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('***************************');
  console.log('* updateCountryPermission *');
  console.log('***************************');

  const requestData: ElasticSipTrunking.UpdateCountryPermissionRequestData = {
    isoCode: 'US',
    updateCountryPermissionRequestBody: {
      enabled: false,
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.countryPermissions.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The Permission for the country '${response.name}' is ${response.enabled ? '' : 'NOT '}enabled`);
  } else {
    printFullResponse(response);
  }

})();
