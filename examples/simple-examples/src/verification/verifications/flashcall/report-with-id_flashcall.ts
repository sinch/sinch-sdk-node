import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationCliFromConfig,
  getVerificationIdFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('***************************************');
  console.log('* ReportVerificationById - flashCall  *');
  console.log('***************************************');

  const verificationId = getVerificationIdFromConfig();
  const verificationCli = getVerificationCliFromConfig();

  const requestData = Verification.reportVerificationByIdHelper.buildFlashCallRequest(
    verificationId, verificationCli);

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.reportFlashCallById(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`FlashCall verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
