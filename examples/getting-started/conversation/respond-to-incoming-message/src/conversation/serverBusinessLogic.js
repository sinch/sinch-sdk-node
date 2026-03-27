import { SinchClient } from '@sinch/sdk-core';

/**
 * Handles the incoming Conversation event by echoing what has been received to the sender.
 * @param { import('@sinch/sdk-core').Conversation.MessageInboundEvent } messageInboundEvent - The incoming Conversation message event object
 * @param { import('@sinch/sdk-core').SinchClientParameters } sinchClientParameters - the Sinch client parameters
 */
export const handleConversationEvent = async (messageInboundEvent, sinchClientParameters) => {
  console.log(`Handling event: ${JSON.stringify(messageInboundEvent, null, 2)}`);

  /** @type {import('@sinch/sdk-core').Conversation.SendTextMessageRequestData<import('@sinch/sdk-core').Conversation.Recipient>} */
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
    },
  };

  console.log(`Replying with: ${JSON.stringify(sendMessageRequest, null, 2)}`);

  const sinchClient = new SinchClient(sinchClientParameters);
  await sinchClient.conversation.messages.sendTextMessage(sendMessageRequest);
};
