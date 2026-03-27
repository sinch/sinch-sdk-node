// eslint-disable-next-line no-unused-vars
import { SinchClient } from '@sinch/sdk-core';

/**
 * Handles the incoming SMS event by echoing what has been received to the sender.
 * @param { import('@sinch/sdk-core').Sms.MOText } incomingTextMessage - The incoming SMS message event object
 * @param { import('@sinch/sdk-core').SinchClientParameters } sinchClientParameters - the Sinch client parameters
 */
export const handleSmsEvent = async (incomingTextMessage, sinchClientParameters) => {
  console.log(`Handling event: ${JSON.stringify(incomingTextMessage, null, 2)}`);

  /** @type {import('@sinch/sdk-core').Sms.SendSMSRequestData} */
  const smsRequest = {
    sendSMSRequestBody: {
      to: [incomingTextMessage.from],
      body: `You sent: ${incomingTextMessage.body}`,
      from: incomingTextMessage.to,
    },
  };

  console.log(`Replying with: ${JSON.stringify(smsRequest, null, 2)}`);

  const sinchClient = new SinchClient(sinchClientParameters);
  await sinchClient.sms.batches.send(smsRequest);
};
