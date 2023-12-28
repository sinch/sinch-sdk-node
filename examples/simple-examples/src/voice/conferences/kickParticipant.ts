import {
  getCallIdFromConfig,
  getConferenceIdFromConfig,
  initApplicationClient,
} from '../../config';
import { KickParticipantRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*****************************');
  console.log('* KickConferenceParticipant *');
  console.log('*****************************');

  const requestData: KickParticipantRequestData = {
    conferenceId: getConferenceIdFromConfig(),
    callId: getCallIdFromConfig(),
  };

  const sinchClient = initApplicationClient();
  sinchClient.voice.setRegion(VoiceRegion.EUROPE);
  try {
    await sinchClient.voice.conferences.kickParticipant(requestData);
  } catch (error) {
    console.log(`Impossible kick the participant '${requestData.callId}' from conference id '${requestData.conferenceId}'`);
    throw error;
  }

  console.log(`The participant '${requestData.callId}' has been successfully kicked from the conference id '${requestData.conferenceId}'`);

})();
