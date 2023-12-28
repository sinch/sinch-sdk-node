import { ListAvailableRegionsRequestData } from '@sinch/sdk-core';
import { getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('**************************************');
  console.log('* NumberService_ListAvailableRegions *');
  console.log('**************************************');

  const requestData: ListAvailableRegionsRequestData = {
    types: ['LOCAL','MOBILE'],
  };

  const sinchClient = initClient();
  const response = await sinchClient.numbers.availableRegions.list(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(response.availableRegions
      ? response.availableRegions.map((region) => region.regionCode)
      : 'No regions were found');
  } else {
    printFullResponse(response);
  }

})();
