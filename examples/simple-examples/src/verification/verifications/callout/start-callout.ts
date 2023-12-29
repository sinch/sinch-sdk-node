import { StartVerificationRequestData } from '@sinch/sdk-core';
import { startVerification } from '../start';
import { getVerificationIdentityFromConfig } from '../../../config';

(async () => {
  console.log('*******************************');
  console.log('* StartVerification - callout *');
  console.log('*******************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData: StartVerificationRequestData = {
    initiateVerificationRequestBody: {
      identity: {
        type: 'number',
        endpoint: verificationIdentity,
      },
      method: 'callout',
      reference: `test-reference-for-callout-verification_${verificationIdentity}`,
    },
  };

  await startVerification(requestData);
})();
