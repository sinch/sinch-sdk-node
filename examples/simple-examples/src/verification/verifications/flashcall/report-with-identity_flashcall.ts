import { ReportVerificationByIdentityRequestData } from '@sinch/sdk-core';
import {
  getVerificationCliFromConfig,
  getVerificationIdentityFromConfig,
} from '../../../config';
import { reportWithIdentity } from '../report-with-identity';

(async () => {
  console.log('*********************************************');
  console.log('* ReportVerificationByIdentity - flashCall  *');
  console.log('*********************************************');

  const verificationIdentity = getVerificationIdentityFromConfig();
  if (!verificationIdentity) {
    throw new Error('No verification identity has been provided. Please update your .env file '
      + 'or edit the ./src/verification/verifications/flashcall/report-with-identity_flashcall.ts file');
  }

  const verificationCli = getVerificationCliFromConfig();
  if (!verificationCli) {
    throw new Error('No verification CLI has been provided. Please update your .env file '
      + 'or edit the ./src/verification/verifications/flashcall/report-with-identity_flashcall.ts file');
  }

  const requestData: ReportVerificationByIdentityRequestData = {
    endpoint: verificationIdentity,
    verificationReportRequestBody: {
      method: 'flashCall',
      flashCall: {
        cli: verificationCli,
      },
    },
  };

  await reportWithIdentity(requestData);
})();
