import { Conversation, ConversationService, SupportedConversationRegion, TranscodingApi } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';

let transcodingApi: TranscodingApi;
let transcodeMessageResponse: Conversation.TranscodeMessageResponse;

Given('the Conversation service "Transcoding" is available', function () {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationHostname: 'http://localhost:3014',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  transcodingApi = conversationService.transcoding;
});

When('I send a request to transcode a location message', async () => {
  transcodeMessageResponse = await transcodingApi.transcodeMessage({
    transcodeMessageRequestBody: {
      app_id: '01W4FFL35P4NC4K35CONVAPP001',
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
        'APPLEBC',
        'INSTAGRAM',
        'KAKAOTALK',
        'KAKAOTALKCHAT',
        'LINE',
        'MESSENGER',
        'RCS',
        'SMS',
        'TELEGRAM',
        'VIBER',
        'WECHAT',
        'WHATSAPP',
      ],
    },
  });
});

Then('the location message is transcoded for all the channels', () => {
  assert.ok(transcodeMessageResponse.transcoded_message?.APPLEBC);
  assert.ok(transcodeMessageResponse.transcoded_message?.INSTAGRAM);
  assert.ok(transcodeMessageResponse.transcoded_message?.KAKAOTALK);
  assert.ok(transcodeMessageResponse.transcoded_message?.KAKAOTALKCHAT);
  assert.ok(transcodeMessageResponse.transcoded_message?.LINE);
  assert.ok(transcodeMessageResponse.transcoded_message?.MESSENGER);
  assert.ok(transcodeMessageResponse.transcoded_message?.RCS);
  assert.ok(transcodeMessageResponse.transcoded_message?.SMS);
  assert.ok(transcodeMessageResponse.transcoded_message?.TELEGRAM);
  assert.ok(transcodeMessageResponse.transcoded_message?.VIBER);
  assert.ok(transcodeMessageResponse.transcoded_message?.WECHAT);
  assert.ok(transcodeMessageResponse.transcoded_message?.WHATSAPP);
  const expectedWhatsAppMessage = {
    to: '{{to}}',
    type: 'location',
    recipient_type: 'individual',
    location: {
      name: 'Phare d\'Eckmühl',
      address: 'Pointe de Penmarch',
      longitude: '-4.3727684',
      latitude: '47.79819',
    },
    messaging_product: 'whatsapp',
    biz_opaque_callback_data: null,
  };
  assert.deepEqual(JSON.parse(transcodeMessageResponse.transcoded_message?.WHATSAPP), expectedWhatsAppMessage);
});
