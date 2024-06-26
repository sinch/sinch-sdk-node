import {
  getCallIdFromConfig,
  getPrintFormat,
  initVoiceService,
  printFullResponse,
} from '../../config';
import { Voice, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('******************');
  console.log('* GetCallResult *');
  console.log('******************');

  const callId = getCallIdFromConfig();

  const requestData: Voice.GetCallResultRequestData = {
    callId,
  };

  const voiceService = initVoiceService();
  voiceService.setRegion(VoiceRegion.EUROPE);
  let response;
  try {
    response = await voiceService.calls.get(requestData);
  } catch (error) {
    console.log(`Impossible get information about call Id ${requestData.callId}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The call '${response.callId}' was from '${response.from}' to '${response.to?.endpoint}' and lasted ${response.duration} seconds
    Rate: ${response.userRate?.amount} ${response.userRate?.currencyId} - Debit: ${response.debit?.amount} ${response.debit?.currencyId}`);
  } else {
    printFullResponse(response);
  }
})();
