import * as dotenv from 'dotenv';
import { SinchClient, Voice } from '@sinch/sdk-core';

async function main() {
  dotenv.config();

  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';
  const sinchNumber = process.env.SINCH_NUMBER || 'MY_SINCH_NUMBER';
  const destinationNumber = process.env.DESTINATION_NUMBER || 'MY_DESTINATION_NUMBER';

  const sinchClient = new SinchClient({
    projectId,
    keyId,
    keySecret,
  });

  const { Calls, CommandsSequenceCreator, Destination } = Voice.v2;

  const commands = new CommandsSequenceCreator()
    .dial((dial) => {
      dial
        .to(Destination.phone(destinationNumber))
        .from(Destination.phone(sinchNumber))
        .name('tracked')
        .timeoutDurationSeconds(30)
        .onAnswer((seq) => {
          seq.text('This call is being tracked. Goodbye.', 'Emma', {
            onFinish: Calls.hangup(),
          });
        })
        .onHangup(Calls.hangup());
    })
    .build();

  // 1. Start the call. Inline events play a short message and hang up.
  const start = await sinchClient.voice.v2.calls.start({
    createCallRequestBody: { commands },
  });
  const sessionId = start.sessionId;
  console.log(`Started sessionId=${sessionId}`);

  // 2. Poll until COMPLETED (the only final session state), bounded with backoff.
  let delay = 2;
  const maxDelay = 15;
  let attempt = 0;
  const maxAttempts = 40;
  while (attempt < maxAttempts) {
    const state = (await sinchClient.voice.v2.sessions.get({ sessionId })).state;
    console.log(`state=${state}`);
    if (state === 'COMPLETED') {
      // terminal state -> stop
      break;
    }
    attempt += 1;
    await new Promise((resolve) => setTimeout(resolve, delay * 1000));
    delay = Math.min(delay * 2, maxDelay);
  }

  // 3. Print per-leg results (callName is NOT returned by the API).
  const session = await sinchClient.voice.v2.sessions.get({ sessionId });
  for (const call of session.calls) {
    console.log(
      `callId=${call.callId} `
        + `callResult=${call.callResult} `
        + `callReason=${call.callReason} `
        + `callDurationSeconds=${call.callDurationSeconds} `
        + `answerTime=${call.answerTime}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
