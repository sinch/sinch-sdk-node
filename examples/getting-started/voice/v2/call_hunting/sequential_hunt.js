import * as dotenv from 'dotenv';
import { SinchClient, Voice } from '@sinch/sdk-core';

async function main() {
  dotenv.config();

  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';
  const sinchNumber = process.env.SINCH_NUMBER || 'MY_SINCH_NUMBER';
  const customerNumber = process.env.CUSTOMER_NUMBER || 'MY_CUSTOMER_NUMBER';
  const agentNumbers = process.env.AGENT_NUMBERS || 'MY_AGENT_NUMBER';

  // Read the first three agents; missing ones repeat the previous agent
  const agents = agentNumbers.split(',').map((number) => number.trim()).filter(Boolean);
  const agent1 = agents[0];
  const agent2 = agents[1] || agent1;
  const agent3 = agents[2] || agent2;

  const sinchClient = new SinchClient({
    projectId,
    keyId,
    keySecret,
  });

  const { Calls, CommandsSequenceCreator, Destination } = Voice.v2;

  // Agent answered: stop the hold message and bridge them in
  const joinBridge = new CommandsSequenceCreator()
    .stopMessages('hold')
    .bridgeCall('hunt-bridge')
    .build();

  // SVAML commands: dial the customer -> on answer play a hold message, join the
  // bridge and dial agent 1 -> on timeout dial agent 2 -> on timeout dial agent 3
  // -> on timeout hang up the customer
  const commands = new CommandsSequenceCreator()
    .dial((dial) => {
      dial
        .to(Destination.phone(customerNumber))
        .from(Destination.phone(sinchNumber))
        .name('customer')
        .timeoutDurationSeconds(30)
        .onAnswer((sequence) => {
          sequence
            .text('Please hold while we connect you to an agent.', 'Emma_3', { name: 'hold' })
            .bridgeCall('hunt-bridge')
            .dial((agentDial) => {
              agentDial
                .to(Destination.phone(agent1))
                .from(Destination.phone(sinchNumber))
                .name('agent-1')
                .timeoutDurationSeconds(20)
                .onAnswer(joinBridge)
                .onTimeout(Calls.dial({
                  to: Destination.phone(agent2),
                  from: Destination.phone(sinchNumber),
                  name: 'agent-2',
                  timeoutDurationSeconds: 20,
                  onAnswer: joinBridge,
                  onTimeout: Calls.dial({
                    to: Destination.phone(agent3),
                    from: Destination.phone(sinchNumber),
                    name: 'agent-3',
                    timeoutDurationSeconds: 20,
                    onAnswer: joinBridge,
                    onTimeout: Calls.hangup({ name: 'customer' }),
                  }),
                }));
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
