import { verificationsHelper } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdentityFromConfig,
  initApplicationClient,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('*******************************');
  console.log('* StartVerification - callout *');
  console.log('*******************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData = verificationsHelper.buildStartCalloutVerificationRequest(
    verificationIdentity,
    `test-reference-for-callout-verification_${verificationIdentity}`,
  );

  const sinchClient = initApplicationClient();
  const response = await sinchClient.verification.verifications.startCallout(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID = ${response.id}`);
  } else {
    printFullResponse(response);
  }
})();
