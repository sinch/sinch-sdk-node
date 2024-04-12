import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationCliFromConfig,
  getVerificationIdentityFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('*********************************************');
  console.log('* ReportVerificationByIdentity - flashCall  *');
  console.log('*********************************************');

  const verificationIdentity = getVerificationIdentityFromConfig();
  const verificationCli = getVerificationCliFromConfig();

  const requestData = Verification.reportVerificationByIdentityHelper.buildFlashCallRequest(
    verificationIdentity, verificationCli);

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.reportFlashCallByIdentity(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`FlashCall verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
