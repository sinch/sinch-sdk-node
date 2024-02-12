import { verificationsHelper } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdentityFromConfig,
  initApplicationClient,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('********************************');
  console.log('* StartVerification - seamless *');
  console.log('********************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData = verificationsHelper.buildStartSeamlessVerificationRequest(
    verificationIdentity,
    `test-reference-for-seamless-verification_${verificationIdentity}`,
  );

  const sinchClient = initApplicationClient();
  const response = await sinchClient.verification.verifications.startSeamless(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID = ${response.id}`);
    console.log(`Seamless verification specific field: template = ${response.seamless?.targetUri}`);
  } else {
    printFullResponse(response);
  }
})();
