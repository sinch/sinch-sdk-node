import { verificationsHelper } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationCodeFromConfig,
  getVerificationIdFromConfig,
  initVerificationService,
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

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.reportSmsById(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`SMS verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
