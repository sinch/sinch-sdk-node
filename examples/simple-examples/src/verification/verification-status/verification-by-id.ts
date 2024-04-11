import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**************************');
  console.log('* VerificationStatusById *');
  console.log('**************************');

  const verificationId = getVerificationIdFromConfig();

  const requestData: Verification.VerificationStatusByIdRequestData = {
    id: verificationId,
  };

  const verificationService = initVerificationService();
  const response = await verificationService.verificationStatus.getById(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID: ${response.id}\nStatus: ${response.status}${response.status === 'SUCCESSFUL' ? '':' (' + response.reason + ')'}\nPrice: ${response.price?.verificationPrice?.amount} ${response.price?.verificationPrice?.currencyId}`);
  } else {
    printFullResponse(response);
  }
})();
