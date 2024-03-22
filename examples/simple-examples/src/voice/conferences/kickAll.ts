import {
  getConferenceIdFromConfig,
  initVoiceService,
} from '../../config';
import { KickAllRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*********************');
  console.log('* KickConferenceAll *');
  console.log('*********************');

  const conferenceId = getConferenceIdFromConfig();

  const requestData: KickAllRequestData = {
    conferenceId,
  };

  const voiceService = initVoiceService();
  voiceService.setRegion(VoiceRegion.EUROPE);
  try {
    await voiceService.conferences.kickAll(requestData);
  } catch (error) {
    console.log(`Impossible kick all participants from conference id '${requestData.conferenceId}'`);
    throw error;
  }

  console.log(`All the participants have been successfully kicked from the conference id '${requestData.conferenceId}'`);

})();
