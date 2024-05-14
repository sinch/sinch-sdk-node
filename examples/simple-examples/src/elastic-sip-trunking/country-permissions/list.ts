import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  getPrintFormat,
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*************************');
  console.log('* getCountryPermissions *');
  console.log('*************************');

  const requestData: ElasticSipTrunking.ListCountryPermissionsRequestData = {};

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.countryPermissions.list(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Here is the status for all the countries:\n${response.countryPermissions?.map((permission) => formatPermission(permission)).join('\n')}`);
  } else {
    printFullResponse(response);
  }

})();

const formatPermission = (countryPermission: ElasticSipTrunking.CountryPermission): string => {
  return ` - ${countryPermission.name}: ${countryPermission.enabled ? '' : 'NOT '} enabled`;
};
