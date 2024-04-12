import {
  getConferenceIdFromConfig,
  getPrintFormat,
  initVoiceService,
  printFullResponse,
} from '../../config';
import { Voice, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*********************');
  console.log('* GetConferenceInfo *');
  console.log('*********************');

  const conferenceId = getConferenceIdFromConfig();

  const requestData: Voice.GetConferenceInfoRequestData = {
    conferenceId,
  };

  const voiceService = initVoiceService();
  voiceService.setRegion(VoiceRegion.EUROPE);
  let response;
  try {
    response = await voiceService.conferences.get(requestData);
  } catch (error) {
    console.log(`Impossible get information about conference Id '${requestData.conferenceId}'`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The conference contains ${response.participants?.length} participants: ${response.participants?.map((participant) => participant.id).join(',')}`);
  } else {
    printFullResponse(response);
  }
})();
