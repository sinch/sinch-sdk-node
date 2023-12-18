import { ReportVerificationByIdRequestData } from '@sinch/sdk-core';
import {
  getVerificationCodeFromConfig,
  getVerificationIdFromConfig,
} from '../../../config';
import { reportWithId } from '../report-with-id';

(async () => {
  console.log('************************************');
  console.log('* ReportVerificationById - callout *');
  console.log('************************************');

  const verificationId = getVerificationIdFromConfig();
  if (!verificationId) {
    throw new Error('No verification id has been provided. Please update your .env file '
      + 'or edit the ./src/verification/verifications/callout/report-with-id_callout.ts file');
  }

  const verificationCode = getVerificationCodeFromConfig();
  if (!verificationCode) {
    throw new Error('No verification code has been provided. Please update your .env file '
      + 'or edit the ./src/verification/verifications/callout/report-with-id_callout.ts file');
  }

  const requestData: ReportVerificationByIdRequestData = {
    id: verificationId,
    verificationReportRequestBody: {
      method: 'callout',
      callout: {
        code: verificationCode,
      },
    },
  };

  await reportWithId(requestData);
})();
