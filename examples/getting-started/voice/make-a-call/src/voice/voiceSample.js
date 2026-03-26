/**
 * Class to place a demo Voice call using the Sinch Node.js SDK.
 */
export class VoiceSample {
  /**
   * @param { VoiceService } voiceService - the VoiceService instance from the Sinch SDK containing the API methods.
   */
  constructor(voiceService) {
    this.voiceService = voiceService;
  }

  async start() {
    const caller = 'CALLER_NUMBER';
    const recipient = 'RECIPIENT_PHONE_NUMBER';

    const response = await this.voiceService.callouts.tts({
      ttsCalloutRequestBody: {
        method: 'ttsCallout',
        ttsCallout: {
          destination: {
            type: 'number',
            endpoint: recipient,
          },
          cli: caller,
          text: 'Hello, this is a call from Sinch. Congratulations! You just made your first call.',
        },
      },
    });

    console.log('Call ID:', response.callId);
  }
}
