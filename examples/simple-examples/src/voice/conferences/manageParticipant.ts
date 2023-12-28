import {
  getCallIdFromConfig,
  getConferenceIdFromConfig,
  initApplicationClient,
} from '../../config';
import { ManageParticipantRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*******************************');
  console.log('* ManageConferenceParticipant *');
  console.log('*******************************');

  const requestData: ManageParticipantRequestData = {
    conferenceId: getConferenceIdFromConfig(),
    callId: getCallIdFromConfig(),
    manageParticipantRequestBody: {
      command: 'mute',
      moh: 'music1',
    },
  };

  const sinchClient = initApplicationClient();
  sinchClient.voice.setRegion(VoiceRegion.EUROPE);
  try {
    await sinchClient.voice.conferences.manageParticipant(requestData);
  } catch (error) {
    console.log(`Impossible manage the participant '${requestData.callId}' with conference id '${requestData.conferenceId}'`);
    throw error;
  }

  console.log(`The participant '${requestData.callId}' has been successfully managed with the conference id '${requestData.conferenceId}'`);

})();
