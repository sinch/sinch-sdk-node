import { verificationsHelper } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdentityFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('***************************');
  console.log('* StartVerification - SMS *');
  console.log('***************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData = verificationsHelper.buildStartSmsVerificationRequest(
    verificationIdentity,
    `test-reference-for-sms-verification_${verificationIdentity}`,
  );

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.startSms(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID = ${response.id}`);
    console.log(`SMS verification specific field: template = ${response.sms?.template}`);
  } else {
    printFullResponse(response);
  }

})();
