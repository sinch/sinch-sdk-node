import { StartVerificationRequestData } from '@sinch/sdk-core';
import { startVerification } from '../start';
import { getVerificationIdentityFromConfig } from '../../../config';

(async () => {
  console.log('***************************');
  console.log('* StartVerification - SMS *');
  console.log('***************************');

  const verificationIdentity = getVerificationIdentityFromConfig();
  if (!verificationIdentity) {
    throw new Error('No verification identity has been provided. '
      + 'Please update your .env file or edit the ./src/verification/verifications/sms/start_sms.ts file');
  }

  const requestData: StartVerificationRequestData = {
    initiateVerificationRequestBody: {
      identity: {
        type: 'number',
        endpoint: verificationIdentity,
      },
      method: 'sms',
      reference: `test-reference-for-sms-verification_${verificationIdentity}`,
    },
  };

  await startVerification(requestData);
})();
