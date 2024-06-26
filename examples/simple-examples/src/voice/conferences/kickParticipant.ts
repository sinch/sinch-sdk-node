import {
  getCallIdFromConfig,
  getConferenceIdFromConfig,
  initVoiceService,
} from '../../config';
import { Voice, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*****************************');
  console.log('* KickConferenceParticipant *');
  console.log('*****************************');

  const conferenceId = getConferenceIdFromConfig();
  const callId = getCallIdFromConfig();

  const requestData: Voice.KickParticipantRequestData = {
    conferenceId,
    callId,
  };

  const voiceService = initVoiceService();
  voiceService.setRegion(VoiceRegion.EUROPE);
  try {
    await voiceService.conferences.kickParticipant(requestData);
  } catch (error) {
    console.log(`Impossible kick the participant '${requestData.callId}' from conference id '${requestData.conferenceId}'`);
    throw error;
  }

  console.log(`The participant '${requestData.callId}' has been successfully kicked from the conference id '${requestData.conferenceId}'`);

})();
