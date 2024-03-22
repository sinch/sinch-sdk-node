import { VerificationStatusByReferenceRequestData } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationReferenceFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*********************************');
  console.log('* VerificationStatusByReference *');
  console.log('*********************************');

  const verificationReference = getVerificationReferenceFromConfig();

  const requestData: VerificationStatusByReferenceRequestData = {
    reference: verificationReference,
  };

  const verificationService = initVerificationService();
  const response = await verificationService.verificationStatus.getByReference(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID: ${response.id}\nStatus: ${response.status}${response.status === 'SUCCESSFUL' ? '':' (' + response.reason + ')'}\nPrice: ${response.price?.verificationPrice?.amount} ${response.price?.verificationPrice?.currencyId}`);
  } else {
    printFullResponse(response);
  }
})();
