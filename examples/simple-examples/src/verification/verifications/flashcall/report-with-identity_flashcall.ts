import { verificationsHelper } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationCliFromConfig,
  getVerificationIdentityFromConfig,
  initApplicationClient,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('*********************************************');
  console.log('* ReportVerificationByIdentity - flashCall  *');
  console.log('*********************************************');

  const verificationIdentity = getVerificationIdentityFromConfig();
  const verificationCli = getVerificationCliFromConfig();

  const requestData = verificationsHelper.buildReportFlashCallVerificationByIdentityRequest(
    verificationIdentity, verificationCli);

  const sinchClient = initApplicationClient();
  const response = await sinchClient.verification.verifications.reportFlashCallByIdentity(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`FlashCall verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
