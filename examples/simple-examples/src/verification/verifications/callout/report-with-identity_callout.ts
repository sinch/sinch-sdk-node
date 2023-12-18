import { ReportVerificationByIdentityRequestData } from '@sinch/sdk-core';
import {
  getVerificationCodeFromConfig,
  getVerificationIdentityFromConfig,
} from '../../../config';
import { reportWithIdentity } from '../report-with-identity';

(async () => {
  console.log('******************************************');
  console.log('* ReportVerificationByIdentity - callout *');
  console.log('******************************************');

  const verificationIdentity = getVerificationIdentityFromConfig();
  if (!verificationIdentity) {
    throw new Error('No verification identity has been provided. Please update your .env file '
      + 'or edit the ./src/verification/verifications/callout/report-with-identity_callout.ts file');
  }

  const verificationCode = getVerificationCodeFromConfig();
  if (!verificationCode) {
    throw new Error('No verification code has been provided. Please update your .env file '
      + 'or edit the ./src/verification/verifications/callout/report-with-identity_callout.ts file');
  }

  const requestData: ReportVerificationByIdentityRequestData = {
    endpoint: verificationIdentity,
    verificationReportRequestBody: {
      method: 'callout',
      callout: {
        code: verificationCode,
      },
    },
  };

  await reportWithIdentity(requestData);
})();
