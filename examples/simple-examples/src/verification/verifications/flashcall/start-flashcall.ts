import { StartVerificationRequestData } from '@sinch/sdk-core';
import { startVerification } from '../start';
import { getVerificationIdentityFromConfig } from '../../../config';

(async () => {
  console.log('*********************************');
  console.log('* StartVerification - flashCall *');
  console.log('*********************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData: StartVerificationRequestData = {
    initiateVerificationRequestBody: {
      identity: {
        type: 'number',
        endpoint: verificationIdentity,
      },
      method: 'flashCall',
      reference: `test-reference-for-flashCall-verification_${verificationIdentity}`,
      flashCallOptions: {
        dialTimeout: 20,
      },
    },
  };

  await startVerification(requestData);
})();
