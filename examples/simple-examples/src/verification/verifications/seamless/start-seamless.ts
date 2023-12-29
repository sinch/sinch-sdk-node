import { StartVerificationRequestData } from '@sinch/sdk-core';
import { startVerification } from '../start';
import { getVerificationIdentityFromConfig } from '../../../config';

(async () => {
  console.log('********************************');
  console.log('* StartVerification - seamless *');
  console.log('********************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData: StartVerificationRequestData = {
    initiateVerificationRequestBody: {
      identity: {
        type: 'number',
        endpoint: verificationIdentity,
      },
      method: 'seamless',
      reference: `test-reference-for-seamless-verification_${verificationIdentity}`,
    },
  };

  await startVerification(requestData);
})();
