import { ReportVerificationByIdRequestData } from '@sinch/sdk-core';
import { getPrintFormat, initVerificationClient, printFullResponse } from '../../config';

export const reportWithId = async (requestData: ReportVerificationByIdRequestData) => {
  const sinchClient = initVerificationClient();
  let response;
  try {
    response = await sinchClient.verification.verifications.reportById(requestData);
  } catch (error) {
    console.log(`Impossible to report the verification for the id ${requestData.id}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }
};
