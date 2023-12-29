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
  const verificationCode = getVerificationCodeFromConfig();

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
