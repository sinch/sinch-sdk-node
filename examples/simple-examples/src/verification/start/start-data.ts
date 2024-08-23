import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdentityFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('****************************');
  console.log('* StartVerification - data *');
  console.log('****************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData = Verification.startVerificationHelper.buildDataRequest(
    verificationIdentity,
    `test-reference-for-seamless-verification_${verificationIdentity}`,
  );

  const verificationService = initVerificationService();
  const response = await verificationService.startVerifications.startData(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID = ${response.id}`);
    console.log(`Data verification specific field: targetUri = ${response.seamless?.targetUri}`);
  } else {
    printFullResponse(response);
  }
})();
