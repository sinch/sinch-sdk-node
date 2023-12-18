import { VerificationStatusByIdRequestData } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdFromConfig,
  initVerificationClient,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**************************');
  console.log('* VerificationStatusById *');
  console.log('**************************');

  const verificationId = getVerificationIdFromConfig();
  if (!verificationId) {
    throw new Error('No verification id has been provided. '
      + 'Please update your .env file or edit the ./src/verification/verification-status/verification-by-id.ts file');
  }

  const requestData: VerificationStatusByIdRequestData = {
    id: verificationId,
  };

  const sinchClient = initVerificationClient();
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
