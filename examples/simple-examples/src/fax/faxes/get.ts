import { GetFaxRequestData } from '@sinch/sdk-core';
import { getFaxIdFromConfig, getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('*******************');
  console.log('* getFaxInfoPerId *');
  console.log('*******************');

  const faxId = getFaxIdFromConfig();

  const requestData: GetFaxRequestData = {
    id: faxId,
  };

  const sinchClient = initClient();
  const response = await sinchClient.fax.faxes.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Fax found: it has been created at '${response.createTime}' and the status is '${response.status}'`);
    if (response.status === 'FAILURE') {
      console.log(`Error type: ${response.errorType} (${response.errorId}): ${response.errorCode}`);
    }
  } else {
    printFullResponse(response);
  }
})();
