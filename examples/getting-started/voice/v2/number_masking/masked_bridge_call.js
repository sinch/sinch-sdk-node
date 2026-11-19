import * as dotenv from 'dotenv';
import { SinchClient, Voice } from '@sinch/sdk-core';

async function main() {
  dotenv.config();

  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';
  const sinchNumber = process.env.SINCH_NUMBER || 'MY_SINCH_NUMBER';
  const destinationNumber = process.env.DESTINATION_NUMBER || 'MY_DESTINATION_NUMBER';
  // Default the two legs; override with two real phones for a proper test
  const partyANumber = process.env.PARTY_A_NUMBER || destinationNumber;
  const partyBNumber = process.env.PARTY_B_NUMBER || sinchNumber;

  const sinchClient = new SinchClient({
    projectId,
    keyId,
    keySecret,
  });

  const { Calls, CommandsSequenceCreator, Destination } = Voice.v2;

  // SVAML commands: dial Party A -> on answer greet, join the bridge and dial
  // Party B -> on Party B answer join the bridge. Both legs show the Sinch number.
  const commands = new CommandsSequenceCreator()
    .dial((dial) => {
      dial
        .to(Destination.phone(partyANumber))
        .from(Destination.phone(sinchNumber))
        .name('party-a')
        .timeoutDurationSeconds(30)
        .onAnswer((seq) => {
          seq
            .text('Please hold while we connect the other party.', 'Emma', {
              name: 'greeting',
            })
            .bridgeCall('masked-bridge')
            .dial((partyB) => {
              partyB
                .to(Destination.phone(partyBNumber))
                .from(Destination.phone(sinchNumber))
                .name('party-b')
                .timeoutDurationSeconds(30)
                .onAnswer(Calls.bridgeCall('masked-bridge'))
                .onHangup(Calls.hangup({ name: 'party-a' }));
            });
        })
        .onHangup(Calls.hangup({ name: 'party-b' }));
    })
    .build();

  console.log(
    `Initiating masked bridge call between ${partyANumber} and ${partyBNumber} ...`,
  );
  console.log(`(Both parties will see ${sinchNumber} as the caller ID)`);

  const response = await sinchClient.voice.v2.calls.start({
    createCallRequestBody: { commands },
  });

  console.log('Bridge call created successfully:');
  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
