/**
 * Class to send a demo SMS message using the Sinch Node.js SDK.
 */
export class SmsSample {
  /**
   * @param { import('@sinch/sdk-core').SmsService } smsService - the SmsService instance from the Sinch SDK containing the API methods.
   */
  constructor(smsService) {
    this.smsService = smsService;
  }

  async start() {
    const sender = 'SENDER_NUMBER';
    const recipient = 'RECIPIENT_PHONE_NUMBER';
    const body = 'This is a test SMS message using the Sinch Node.js SDK.';

    const response = await this.smsService.batches.sendTextMessage({
      sendSMSRequestBody: {
        from: sender,
        to: [recipient],
        body,
      },
    });

    console.log('Batch ID:', response.id);
  }
}
