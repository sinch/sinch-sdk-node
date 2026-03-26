import { SinchClient } from '@sinch/sdk-core';

/**
 * Handles the incoming Conversation event by echoing what has been received to the sender.
 * @param { MessageInboundEvent } messageInboundEvent - The incoming Conversation message event object
 * @param sinchClientParameters - the Conversation service instance from the Sinch SDK containing the API methods
 */
export const handleConversationEvent = async (messageInboundEvent, sinchClientParameters) => {
  console.log(`Handling event: ${JSON.stringify(messageInboundEvent, null, 2)}`);

  /** @type {Conversation.SendTextMessageRequestData} */
  const sendMessageRequest = {
    sendMessageRequestBody: {
      app_id: messageInboundEvent.app_id,
      message: {
        text_message: {
          text: `You sent: ${messageInboundEvent.message.contact_message.text_message.text}`,
        },
      },
      recipient: {
        identified_by: {
          channel_identities: [
            {
              channel: 'SMS',
              identity: messageInboundEvent.message.channel_identity.identity,
            },
          ],
        },
      },
    }
  };

  console.log(`Replying with: ${JSON.stringify(sendMessageRequest, null, 2)}`);

  const sinchClient = new SinchClient(sinchClientParameters);
  await sinchClient.conversation.messages.sendTextMessage(sendMessageRequest);
};
