import { VerificationStatusByIdRequestData } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdFromConfig,
  initApplicationClient,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**************************');
  console.log('* VerificationStatusById *');
  console.log('**************************');

  const verificationId = getVerificationIdFromConfig();

  const requestData: VerificationStatusByIdRequestData = {
    id: verificationId,
  };

  const sinchClient = initApplicationClient();
  let response;
  try {
    response = await sinchClient.verification.verificationStatus.getById(requestData);
  } catch (error) {
    console.log(`Impossible to get the verification status for the id ${requestData.id}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID: ${response.id}\nStatus: ${response.status}${response.status === 'SUCCESSFUL' ? '':' (' + response.reason + ')'}\nPrice: ${response.price?.verificationPrice?.amount} ${response.price?.verificationPrice?.currencyId}`);
  } else {
    printFullResponse(response);
  }
})();
