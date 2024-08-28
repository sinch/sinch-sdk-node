import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationCodeFromConfig,
  getVerificationIdentityFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('********************************************');
  console.log('* ReportVerificationByIdentity - phoneCall *');
  console.log('********************************************');

  const verificationIdentity = getVerificationIdentityFromConfig();
  const verificationCode = getVerificationCodeFromConfig();

  const requestData = Verification.reportVerificationByIdentityHelper.buildPhoneCallRequest(
    verificationIdentity, verificationCode);

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.reportPhoneCallByIdentity(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Phone call verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
