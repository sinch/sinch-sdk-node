import { ReportVerificationByIdRequestData } from '@sinch/sdk-core';
import {
  getVerificationCliFromConfig,
  getVerificationIdFromConfig,
} from '../../../config';
import { reportWithId } from '../report-with-id';

(async () => {
  console.log('***************************************');
  console.log('* ReportVerificationById - flashCall  *');
  console.log('***************************************');

  const verificationId = getVerificationIdFromConfig();
  if (!verificationId) {
    throw new Error('No verification id has been provided. Please update your .env file '
      + 'or edit the ./src/verification/verifications/flashcall/report-with-id_flashcall.ts file');
  }

  const verificationCli = getVerificationCliFromConfig();
  if (!verificationCli) {
    throw new Error('No verification CLI has been provided. Please update your .env file '
      + 'or edit the ./src/verification/verifications/flashcall/report-with-id_flashcall.ts file');
  }

  const requestData: ReportVerificationByIdRequestData = {
    id: verificationId,
    verificationReportRequestBody: {
      method: 'flashCall',
      flashCall: {
        cli: verificationCli,
      },
    },
  };

  await reportWithId(requestData);
})();
