import { verificationsHelper } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationCodeFromConfig,
  getVerificationIdFromConfig,
  initApplicationClient,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('*********************************');
  console.log('* ReportVerificationById - SMS  *');
  console.log('*********************************');

  const verificationId = getVerificationIdFromConfig();
  const verificationCode = getVerificationCodeFromConfig();

  const requestData = verificationsHelper.buildReportSmsVerificationByIdRequest(
    verificationId, verificationCode);

  const sinchClient = initApplicationClient();
  const response = await sinchClient.verification.verifications.reportSmsById(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`SMS verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
