import { VerificationStatusByReferenceRequestData } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationReferenceFromConfig,
  initApplicationClient,
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

  const sinchClient = initApplicationClient();
  let response;
  try {
    response = await sinchClient.verification.verificationStatus.getByReference(requestData);
  } catch (error) {
    console.log(`Impossible to get the verification status for the reference ${requestData.reference}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID: ${response.id}\nStatus: ${response.status}${response.status === 'SUCCESSFUL' ? '':' (' + response.reason + ')'}\nPrice: ${response.price?.verificationPrice?.amount} ${response.price?.verificationPrice?.currencyId}`);
  } else {
    printFullResponse(response);
  }
})();
