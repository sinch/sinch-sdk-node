import * as dotenv from 'dotenv';
import { SinchClient, Voice } from '@sinch/sdk-core';

async function main() {
  dotenv.config();

  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';
  const sinchNumber = process.env.SINCH_NUMBER || 'MY_SINCH_NUMBER';
  const callerNumber = process.env.CALLER_NUMBER || 'MY_CALLER_NUMBER';
  const primaryNumber = process.env.PRIMARY_NUMBER || 'MY_PRIMARY_NUMBER';
  const fallbackNumber = process.env.FALLBACK_NUMBER || 'MY_FALLBACK_NUMBER';

  const sinchClient = new SinchClient({
    projectId,
    keyId,
    keySecret,
  });

  const { Calls, CommandsSequenceCreator, Destination } = Voice.v2;

  const joinBridge = new CommandsSequenceCreator()
    .stopMessages('hold')
    .bridgeCall('fwd-bridge')
    .build();

  // SVAML commands: dial the caller -> on answer play hold prompt, join the bridge
  // and dial the primary -> on primary timeout dial the fallback -> on fallback
  // timeout hang up the caller
  const commands = new CommandsSequenceCreator()
    .dial((dial) => {
      dial
        .to(Destination.phone(callerNumber))
        .from(Destination.phone(sinchNumber))
        .name('caller')
        .timeoutDurationSeconds(30)
        .onAnswer((seq) => {
          // Step 1: play a hold prompt while we try the primary
          seq.text('Connecting your call.', 'Emma', { name: 'hold' });
          // Step 2: caller joins the bridge (created on first reference)
          seq.bridgeCall('fwd-bridge');
          // Step 3: dial the primary number
          seq.dial((primary) => {
            primary
              .to(Destination.phone(primaryNumber))
              .from(Destination.phone(sinchNumber))
              .name('primary')
              .timeoutDurationSeconds(20)
              // Primary answered: stop the hold prompt, bridge them
              .onAnswer(joinBridge)
              // Primary didn't answer: try the fallback
              .onTimeout(
                Calls.dial({
                  to: Destination.phone(fallbackNumber),
                  from: Destination.phone(sinchNumber),
                  name: 'fallback',
                  timeoutDurationSeconds: 20,
                  onAnswer: joinBridge,
                  onTimeout: Calls.hangup({ name: 'caller' }),
                }),
              );
          });
        })
        .onHangup((seq) => {
          seq.hangup({ name: 'primary' }).hangup({ name: 'fallback' });
        });
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
