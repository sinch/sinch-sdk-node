import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdentityFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../../config';

/** @deprecated see ./start-phonecall.ts instead */
(async () => {
  console.log('*******************************');
  console.log('* StartVerification - callout *');
  console.log('*******************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData = Verification.startVerificationHelper.buildCalloutRequest(
    verificationIdentity,
    `test-reference-for-callout-verification_${verificationIdentity}`,
  );

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.startCallout(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID = ${response.id}`);
  } else {
    printFullResponse(response);
  }
})();
