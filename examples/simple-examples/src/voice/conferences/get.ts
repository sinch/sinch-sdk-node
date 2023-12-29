import {
  getConferenceIdFromConfig,
  getPrintFormat,
  initApplicationClient,
  printFullResponse,
} from '../../config';
import { GetConferenceInfoRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*********************');
  console.log('* GetConferenceInfo *');
  console.log('*********************');

  const conferenceId = getConferenceIdFromConfig();

  const requestData: GetConferenceInfoRequestData = {
    conferenceId,
  };

  const sinchClient = initApplicationClient();
  sinchClient.voice.setRegion(VoiceRegion.EUROPE);
  let response;
  try {
    response = await sinchClient.voice.conferences.get(requestData);
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
