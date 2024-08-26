import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdentityFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../../config';

/** @deprecated see ./start-data.ts instead */
(async () => {
  console.log('********************************');
  console.log('* StartVerification - seamless *');
  console.log('********************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData = Verification.startVerificationHelper.buildSeamlessRequest(
    verificationIdentity,
    `test-reference-for-seamless-verification_${verificationIdentity}`,
  );

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.startSeamless(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID = ${response.id}`);
    console.log(`Seamless verification specific field: targetUri = ${response.seamless?.targetUri}`);
  } else {
    printFullResponse(response);
  }
})();
