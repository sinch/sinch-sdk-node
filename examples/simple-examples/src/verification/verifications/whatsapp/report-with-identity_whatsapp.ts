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
  console.log('* ReportVerificationByIdentity - WhatsApp  *');
  console.log('********************************************');

  const verificationIdentity = getVerificationIdentityFromConfig();
  const verificationCode = getVerificationCodeFromConfig();

  const requestData = Verification.reportVerificationByIdentityHelper.buildWhatsAppRequest(
    verificationIdentity, verificationCode);

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.reportWhatsAppByIdentity(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`WhatsApp verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
