import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdentityFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('*********************************');
  console.log('* StartVerification - flashCall *');
  console.log('*********************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData = Verification.startVerificationHelper.buildFlashCallRequest(
    verificationIdentity,
    `test-reference-for-flashCall-verification_${verificationIdentity}`,
    20,
  );

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.startFlashCall(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID = ${response.id}`);
    console.log(`FlashCall verification specific field: cliFilter = ${response.flashCall?.cliFilter}`);
  } else {
    printFullResponse(response);
  }
})();
