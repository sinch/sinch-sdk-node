import {
  getCallIdFromConfig,
  getPrintFormat,
  initApplicationClient,
  printFullResponse,
} from '../../config';
import { GetCallResultRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('******************');
  console.log('* GetCallResult *');
  console.log('******************');

  const callId = getCallIdFromConfig();

  const requestData: GetCallResultRequestData = {
    callId,
  };

  const sinchClient = initApplicationClient();
  sinchClient.voice.setRegion(VoiceRegion.EUROPE);
  let response;
  try {
    response = await sinchClient.voice.calls.get(requestData);
  } catch (error) {
    console.log(`Impossible get information about call Id ${requestData.callId}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    // TODO: Add a post process on the response to fix the missing timezone in the timestamp
    console.log(`The call '${response.callId}' was from '${response.from}' to '${response.to?.endpoint}' and lasted ${response.duration} seconds
    Rate: ${response.userRate?.amount} ${response.userRate?.currencyId} - Debit: ${response.debit?.amount} ${response.debit?.currencyId}`);
  } else {
    printFullResponse(response);
  }
})();
