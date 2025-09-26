import { Fax } from '@sinch/sdk-core';
import {
  getFaxCoverPageIdFromConfig,
  getFaxServiceIdFromConfig,
  getPrintFormat,
  initFaxService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('****************');
  console.log('* GetCoverPage *');
  console.log('****************');

  const serviceId = getFaxServiceIdFromConfig();
  const coverPageId = getFaxCoverPageIdFromConfig();

  const requestData: Fax.GetCoverPageRequestData = {
    serviceId,
    coverPageId,
  };

  const faxService = initFaxService();
  const response = await faxService.coverPages.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Cover Page ID: '${response.id} - Cover Page name: '${response.name}'`);
  } else {
    printFullResponse(response);
  }
})();
