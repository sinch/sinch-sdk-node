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

  /**
   * @param {string} number
   * @param {string} name
   * @param {string[]} others
   */
  function ringAgent(number, name, others) {
    // First agent to answer stops the hold message, hangs up the other agent
    // legs and joins the bridge
    return Calls.dial({
      to: Destination.phone(number),
      from: Destination.phone(sinchNumber),
      name,
      timeoutDurationSeconds: 25,
      onAnswer: new CommandsSequenceCreator()
        .stopMessages('hold')
        .hangup({ name: others[0] })
        .hangup({ name: others[1] })
        .bridgeCall('hunt-bridge')
        .build(),
    });
  }

  // SVAML commands: dial the customer -> on answer play a hold message, join the
  // bridge and ring the three agents at once (dial is non-blocking) -> first to
  // answer wins
  const commands = new CommandsSequenceCreator()
    .dial((dial) => {
      dial
        .to(Destination.phone(customerNumber))
        .from(Destination.phone(sinchNumber))
        .name('customer')
        .timeoutDurationSeconds(30)
        .onAnswer((sequence) => {
          sequence
            .text('Connecting you now.', 'Emma_3', { name: 'hold' })
            .bridgeCall('hunt-bridge')
            .command(ringAgent(agent1, 'agent-A', ['agent-B', 'agent-C']))
            .command(ringAgent(agent2, 'agent-B', ['agent-A', 'agent-C']))
            .command(ringAgent(agent3, 'agent-C', ['agent-A', 'agent-B']));
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
