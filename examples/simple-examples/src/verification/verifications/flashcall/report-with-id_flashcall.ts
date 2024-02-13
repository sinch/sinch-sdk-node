import { verificationsHelper } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationCliFromConfig,
  getVerificationIdFromConfig,
  initApplicationClient,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('***************************************');
  console.log('* ReportVerificationById - flashCall  *');
  console.log('***************************************');

  const verificationId = getVerificationIdFromConfig();
  const verificationCli = getVerificationCliFromConfig();

  const requestData = verificationsHelper.buildReportFlashCallVerificationByIdRequest(
    verificationId, verificationCli);

  const sinchClient = initApplicationClient();
  const response = await sinchClient.verification.verifications.reportFlashCallById(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`FlashCall verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
