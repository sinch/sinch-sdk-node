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
  const verificationCli = getVerificationCliFromConfig();

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
