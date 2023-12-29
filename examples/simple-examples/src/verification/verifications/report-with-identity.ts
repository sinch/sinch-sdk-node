import { ReportVerificationByIdentityRequestData } from '@sinch/sdk-core';
import { getPrintFormat, initApplicationClient, printFullResponse } from '../../config';

export const reportWithIdentity = async (requestData: ReportVerificationByIdentityRequestData) => {
  const sinchClient = initApplicationClient();
  let response;
  try {
    response = await sinchClient.verification.verifications.reportByIdentity(requestData);
  } catch (error) {
    console.log(`Impossible to report the verification for the identity ${requestData.endpoint}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification status: ${response.status}${response.status === 'SUCCESSFUL'?'':' - Reason: ' + response.reason}`);
  } else {
    printFullResponse(response);
  }
};
