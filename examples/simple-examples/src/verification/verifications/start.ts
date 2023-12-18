import { StartVerificationRequestData } from '@sinch/sdk-core';
import { getPrintFormat, initVerificationClient, printFullResponse } from '../../config';

export const startVerification = async (requestData: StartVerificationRequestData) => {
  const sinchClient = initVerificationClient();
  let response;
  try {
    response = await sinchClient.verification.verifications.start(requestData);
  } catch (error) {
    console.error(`Impossible to start the verification for the number ${requestData.initiateVerificationRequestBody.identity.endpoint}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID = ${response.id}`);
  } else {
    printFullResponse(response);
  }
};
