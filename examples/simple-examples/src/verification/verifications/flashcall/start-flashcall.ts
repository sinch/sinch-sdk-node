import { StartVerificationRequestData } from '@sinch/sdk-core';
import { startVerification } from '../start';
import { getVerificationIdentityFromConfig } from '../../../config';

(async () => {
  console.log('*********************************');
  console.log('* StartVerification - flashCall *');
  console.log('*********************************');

  const verificationIdentity = getVerificationIdentityFromConfig();
  if (!verificationIdentity) {
    throw new Error('No verification identity has been provided. '
      + 'Please update your .env file or edit the ./src/verification/verifications/flashcall/start-flashcall.ts file');
  }

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
