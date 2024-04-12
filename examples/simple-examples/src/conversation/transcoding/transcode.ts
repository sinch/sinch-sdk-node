import { Conversation } from '@sinch/sdk-core';
import { getAppIdFromConfig, getPrintFormat, initConversationService, printFullResponse } from '../../config';

(async () => {
  console.log('********************************');
  console.log('* Transcoding_TranscodeMessage *');
  console.log('********************************');

  const appId = getAppIdFromConfig();

  const requestData: Conversation.TranscodeMessageRequestData = {
    transcodeMessageRequestBody: {
      app_id: appId,
      app_message: {
        location_message: {
          title: 'Phare d\'Eckmühl',
          label: 'Pointe de Penmarch',
          coordinates: {
            latitude: 47.7981899,
            longitude: -4.3727685,
          },
        },
      },
      channels: [
        'MESSENGER',
      ],
      from: 'from',
      to: 'to',
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.transcoding.transcodeMessage(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    if (response.transcoded_message) {
      console.log(`Transcoded messages:\n`);
      Object.entries(response.transcoded_message).forEach(([channel, transcodedValue]) => {
        const transcodedMessage = JSON.parse(transcodedValue);
        console.log(channel + ': ' + JSON.stringify(transcodedMessage.message));
      });
    } else {
      console.log('No transcoded messages returned.');
    }
  } else {
    printFullResponse(response);
  }
})();
