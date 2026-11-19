import * as dotenv from 'dotenv';
import { SinchClient, Voice } from '@sinch/sdk-core';

async function main() {
  dotenv.config();

  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';
  const sinchNumber = process.env.SINCH_NUMBER || 'MY_SINCH_NUMBER';
  const destinationNumber = process.env.DESTINATION_NUMBER || 'MY_DESTINATION_NUMBER';
  // Override voices: VOICE_PLAIN=Emma VOICE_SSML=Brian
  const voicePlain = process.env.VOICE_PLAIN || 'Emma';
  const voiceSsml = process.env.VOICE_SSML || 'Brian';

  const sinchClient = new SinchClient({
    projectId,
    keyId,
    keySecret,
  });

  const { Calls, CommandsSequenceCreator, Destination } = Voice.v2;

  // SVAML commands: dial -> on answer play a plain text SAY, a PLAY clip and an
  // SSML SAY in sequence -> hangup
  const commands = new CommandsSequenceCreator()
    .dial((dial) => {
      dial
        .to(Destination.phone(destinationNumber))
        .from(Destination.phone(sinchNumber))
        .name('tts-sampler')
        .timeoutDurationSeconds(30)
        .maxDurationSeconds(120)
        .onAnswer((seq) => {
          seq.messages((messages) => {
            messages
              .name('sampler')
              .onFinish(Calls.hangup())
              .text(
                `Hello, this is a plain text message with the ${voicePlain} voice.`,
                /** @type {import('@sinch/sdk-core').Voice.v2.VoiceName} */ (voicePlain),
              )
              .play('https://samplelib.com/mp3/sample-3s.mp3')
              .ssml(
                "<speak>"
                  + "<prosody rate='slow'>"
                  + 'Now hear an S S M L example. '
                  + "Your code is <say-as interpret-as='characters'>4837</say-as>."
                  + '</prosody>'
                  + "<break time='400ms'/>"
                  + 'Goodbye.'
                  + '</speak>',
                /** @type {import('@sinch/sdk-core').Voice.v2.VoiceName} */ (voiceSsml),
              );
          });
        })
        .onHangup(Calls.hangup());
    })
    .build();

  const response = await sinchClient.voice.v2.calls.start({
    createCallRequestBody: { commands },
  });

  console.log('Call created successfully:');
  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
