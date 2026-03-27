import { Voice } from '@sinch/sdk-core';

/**
 * Handles an Incoming Call Event (ICE).
 * @param {import('@sinch/sdk-core').Voice.IceRequest} iceRequest - The incoming ICE request object.
 * @return {import('@sinch/sdk-core').Voice.IceResponse} The formatted ICE response to handle the incoming call.
 */
export const handleIncomingCallEvent = (iceRequest) => {
  console.log(`Handling 'ICE' event:\n${JSON.stringify(iceRequest, null, 2)}`);

  const instruction = 'Thank you for calling your Sinch number. You have just handled an incoming call.';

  return new Voice.IceSvamletBuilder()
    .setAction(Voice.iceActionHelper.hangup())
    .addInstruction(Voice.iceInstructionHelper.say(instruction))
    .build();
};

/**
 * Handles a disconnected call event (DICE).
 * @param {import('@sinch/sdk-core').Voice.DiceRequest} diceRequest - The incoming DICE request object.
 * @return {string} An empty string as a response to the disconnected call event.
 */
export const handleDisconnectedCallEvent = (diceRequest) => {
  console.log(`Handling 'DICE' event:\n${JSON.stringify(diceRequest, null, 2)}`);

  return '';
};
