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
  console.log('* ReportVerificationById - WhatsApp  *');
  console.log('**************************************');

  const verificationId = getVerificationIdFromConfig();
  const verificationCode = getVerificationCodeFromConfig();

  const requestData = Verification.reportVerificationByIdHelper.buildWhatsAppRequest(
    verificationId, verificationCode);

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.reportWhatsAppById(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`WhatsApp verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
