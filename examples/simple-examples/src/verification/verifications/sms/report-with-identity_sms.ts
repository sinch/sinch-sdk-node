import { verificationsHelper } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationCodeFromConfig,
  getVerificationIdentityFromConfig,
  initApplicationClient,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('***************************************');
  console.log('* ReportVerificationByIdentity - SMS  *');
  console.log('***************************************');

  const verificationIdentity = getVerificationIdentityFromConfig();
  const verificationCode = getVerificationCodeFromConfig();

  const requestData = verificationsHelper.buildReportSmsVerificationByIdentityRequest(
    verificationIdentity, verificationCode);

  const sinchClient = initApplicationClient();
  const response = await sinchClient.verification.verifications.reportSmsByIdentity(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`SMS verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
