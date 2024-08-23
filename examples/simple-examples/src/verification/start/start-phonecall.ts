import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdentityFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**********************************');
  console.log('* StartVerification - phoneCall *');
  console.log('**********************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData = Verification.startVerificationHelper.buildPhoneCallRequest(
    verificationIdentity,
    `test-reference-for-callout-verification_${verificationIdentity}`,
  );

  const verificationService = initVerificationService();
  const response = await verificationService.startVerifications.startPhoneCall(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID = ${response.id}`);
  } else {
    printFullResponse(response);
  }
})();
