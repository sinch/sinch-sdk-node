import * as dotenv from 'dotenv';
import { SinchClient, Voice } from '@sinch/sdk-core';

async function main() {
  dotenv.config();

  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';
  const sinchNumber = process.env.SINCH_NUMBER || 'MY_SINCH_NUMBER';
  const recipients = [
    process.env.DEST_1 || 'MY_DEST_1',
    process.env.DEST_2 || 'MY_DEST_2',
  ];
  const maxCps = Number(process.env.MAX_CPS || '5');
  const ttlSeconds = Number(process.env.TTL_SECONDS || '1800');

  const sinchClient = new SinchClient({
    projectId,
    keyId,
    keySecret,
  });

  const { Calls, CommandsSequenceCreator, Destination } = Voice.v2;

  // SVAML commands: dial @toNumber -> on answer TTS -> hangup
  const commands = new CommandsSequenceCreator()
    .dial((dial) => {
      dial
        .to(Destination.phone('@toNumber'))
        .from(Destination.phone(sinchNumber))
        .name('batch-reminder')
        .timeoutDurationSeconds(30)
        .maxDurationSeconds(120)
        .onAnswer((seq) => {
          seq.text(
            'Hello, this is an automated reminder from Sinch. Goodbye.',
            'Emma',
            { onFinish: Calls.hangup() },
          );
        })
        .onHangup(Calls.hangup());
    })
    .build();

  // `parameters` is a list; each entry queues one call using that
  // entry's placeholder values. One request, however many destinations.
  const parameters = recipients.map((recipient) => ({ toNumber: recipient }));

  console.log(
    `Submitting batch to ${recipients.join(', ')} (maxCps=${maxCps}, ttlSeconds=${ttlSeconds}) ...`,
  );

  const response = await sinchClient.voice.v2.batches.start({
    startBatchRequestBody: {
      commands,
      parameters,
      batchOptions: {
        maxCps,
        ttlSeconds,
      },
    },
  });

  console.log('Batch created:');
  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
