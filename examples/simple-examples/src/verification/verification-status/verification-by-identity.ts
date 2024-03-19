import { VerificationStatusByIdentityRequestData } from '@sinch/sdk-core';
import { getPrintFormat, getVerificationIdentityFromConfig, initVerificationService, printFullResponse } from '../../config';

(async () => {
  console.log('********************************');
  console.log('* VerificationStatusByIdentity *');
  console.log('********************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData: VerificationStatusByIdentityRequestData = {
    endpoint: verificationIdentity,
    method: 'sms',
  };

  const verificationService = initVerificationService();
  const response = await verificationService.verificationStatus.getByIdentity(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID: ${response.id}\nStatus: ${response.status}${response.status === 'SUCCESSFUL' ? '':' (' + response.reason + ')'}\nPrice: ${response.price?.verificationPrice?.amount} ${response.price?.verificationPrice?.currencyId}`);
  } else {
    printFullResponse(response);
  }
})();
