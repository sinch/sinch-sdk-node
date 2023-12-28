import {
  getConferenceIdFromConfig,
  initApplicationClient,
} from '../../config';
import { KickAllRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*********************');
  console.log('* KickConferenceAll *');
  console.log('*********************');

  const requestData: KickAllRequestData = {
    conferenceId: getConferenceIdFromConfig(),
  };

  const sinchClient = initApplicationClient();
  sinchClient.voice.setRegion(VoiceRegion.EUROPE);
  try {
    await sinchClient.voice.conferences.kickAll(requestData);
  } catch (error) {
    console.log(`Impossible kick all participants from conference id '${requestData.conferenceId}'`);
    throw error;
  }

  console.log(`All the participants have been successfully kicked from the conference id '${requestData.conferenceId}'`);

})();
