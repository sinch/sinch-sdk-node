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
    // TODO: Update the response model according to the server response
    // to: Object with type / endpoint
    // userRate: Object with currencyID / amount
    // debit: Object with currencyID / amount
    // timestamp: missing timezone
    console.log(`The call '${response.callId}' was from '${response.from}' to '${response.to}' and lasted ${response.duration} seconds`);
  } else {
    printFullResponse(response);
  }
})();
