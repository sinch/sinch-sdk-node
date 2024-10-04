import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationCodeFromConfig,
  getVerificationIdFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('**************************************');
  console.log('* ReportVerificationById - phoneCall *');
  console.log('**************************************');

  const verificationId = getVerificationIdFromConfig();
  const verificationCode = getVerificationCodeFromConfig();

  const requestData = Verification.reportVerificationByIdHelper.buildPhoneCallRequest(
    verificationId, verificationCode);

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.reportPhoneCallById(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Phone call verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
