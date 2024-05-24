import { Fax } from '@sinch/sdk-core';
import { getFaxIdFromConfig, getPrintFormat, initFaxService, printFullResponse } from '../../config';

(async () => {
  console.log('*******************');
  console.log('* getFaxInfoPerId *');
  console.log('*******************');

  const faxId = getFaxIdFromConfig();

  const requestData: Fax.GetFaxRequestData = {
    id: faxId,
  };

  const faxService = initFaxService();
  const response = await faxService.faxes.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Fax found: it has been created at '${response.createTime}' and the status is '${response.status}'`);
    if (response.status === 'FAILURE') {
      console.log(`Error type: ${response.errorType} (${response.errorCode}): ${response.errorMessage}`);
    }
  } else {
    printFullResponse(response);
  }
})();
