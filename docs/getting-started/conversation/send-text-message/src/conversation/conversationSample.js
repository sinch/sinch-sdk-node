/**
 * Class to send a demo SMS message through the Conversation API using the Sinch Node.js SDK.
 */
export class ConversationSample {
  /**
   * @param { ConversationService } conversationService - the ConversationService instance from the Sinch SDK containing the API methods.
   */
  constructor(conversationService) {
    this.conversationService = conversationService;
  }

  async start() {
    const appId = 'CONVERSATION_APPLICATION_ID';
    const from = 'SINCH_VIRTUAL_PHONE_NUMBER';
    const to = 'RECIPIENT_PHONE_NUMBER';

    const body= 'This is a test Conversation message sent using the Sinch Node.js SDK.';

    const response = await this.conversationService.messages.sendTextMessage({
      sendMessageRequestBody: {
        app_id: appId,
        message: {
          text_message: {
            text: body,
          },
        },
        recipient: {
          identified_by: {
            channel_identities: [
              {
                channel: 'SMS',
                identity: to,
              },
            ],
          },
        },
        channel_properties: {
          SMS_SENDER: from,
        },
      },
    });

    console.log('Response:', response);
  }
}
