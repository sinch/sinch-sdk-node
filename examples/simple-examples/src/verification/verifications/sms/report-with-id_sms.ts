import { ReportVerificationByIdRequestData } from '@sinch/sdk-core';
import {
  getVerificationCodeFromConfig,
  getVerificationIdFromConfig,
} from '../../../config';
import { reportWithId } from '../report-with-id';

(async () => {
  console.log('*********************************');
  console.log('* ReportVerificationById - SMS  *');
  console.log('*********************************');

  const verificationId = getVerificationIdFromConfig();
  const verificationCode = getVerificationCodeFromConfig();

  const requestData: ReportVerificationByIdRequestData = {
    id: verificationId,
    verificationReportRequestBody: {
      method: 'sms',
      sms: {
        code: verificationCode,
      },
    },
  };

  await reportWithId(requestData);
})();
