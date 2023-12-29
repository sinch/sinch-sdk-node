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
  const verificationCli = getVerificationCliFromConfig();

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
