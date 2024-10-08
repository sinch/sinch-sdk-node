import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationCodeFromConfig,
  getVerificationIdentityFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../../config';

/** @deprecated see ./report-with-identity_phonecall.ts instead */
(async () => {
  console.log('******************************************');
  console.log('* ReportVerificationByIdentity - callout *');
  console.log('******************************************');

  const verificationIdentity = getVerificationIdentityFromConfig();
  const verificationCode = getVerificationCodeFromConfig();

  const requestData = Verification.reportVerificationByIdentityHelper.buildCalloutRequest(
    verificationIdentity, verificationCode);

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.reportCalloutByIdentity(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Phone call verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }

})();
