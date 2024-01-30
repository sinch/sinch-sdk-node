import { TranscodeMessageRequestData } from '@sinch/sdk-core';
import { getAppIdFromConfig, getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('********************************');
  console.log('* Transcoding_TranscodeMessage *');
  console.log('********************************');

  const appId = getAppIdFromConfig();

  const requestData: TranscodeMessageRequestData = {
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

  const sinchClient = initClient();
  const response = await sinchClient.conversation.transcoding.transcodeMessage(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    if (response.transcoded_message) {
      console.log(`Transcoded messages:\n - ${Object.keys(response.transcoded_message)
        .map((key: string) => {
          const transcodedMessage = JSON.parse(response.transcoded_message![key]);
          return key + ': ' + JSON.stringify(transcodedMessage.message);
        })}`);
    } else {
      console.log('No transcoded messages returned.');
    }
  } else {
    printFullResponse(response);
  }
})();
