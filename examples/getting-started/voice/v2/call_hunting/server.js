import * as dotenv from 'dotenv';
import express from 'express';
import { Voice, VoiceV2CallbackWebhooks } from '@sinch/sdk-core';

dotenv.config();

const sinchNumber = process.env.SINCH_NUMBER || 'MY_SINCH_NUMBER';
const agentNumbers = process.env.AGENT_NUMBERS || 'MY_AGENT_NUMBER';
const port = Number(process.env.PORT || '3000');

const agents = agentNumbers.split(',').map((number) => number.trim()).filter(Boolean);

const FAILED_EVENTS = ['call.timeout', 'call.busy', 'call.rejected', 'call.failed'];

const { Calls, CommandsSequenceCreator, Destination } = Voice.v2;
const callbackWebhooks = new VoiceV2CallbackWebhooks();

// In-memory hunt cursor: session ID -> index of the agent being dialed.
const cursors = new Map();

const app = express();
app.use(express.json());

/**
 * @param {number} index
 */
function dialAgent(index) {
  return Calls.dial({
    to: Destination.phone(agents[index]),
    from: Destination.phone(sinchNumber),
    name: `agent-${index}`,
    timeoutDurationSeconds: 20,
  });
}

/**
 * @param {import('@sinch/sdk-core').Voice.v2.WebhookRequest} event
 */
function handleEvent(event) {
  const sessionId = event.call.sessionId;
  const callName = event.call.callName || '';

  console.log(`event=${event.event} sessionId=${sessionId} callName=${callName}`);

  if (event.event === 'call.incoming') {
    // Inbound call: the inbound leg is the customer. Answer, join the
    // bridge and dial the first agent
    cursors.set(sessionId, 0);
    return VoiceV2CallbackWebhooks.incomingCallResponse({
      commands: new CommandsSequenceCreator()
        .answer()
        .text('Please hold while we find an agent.', 'Emma_3', { name: 'hold' })
        .bridgeCall('hunt-bridge')
        .command(dialAgent(0))
        .build(),
      onHangup: Calls.hangup(),
    });
  }

  if (event.event === 'call.answered' && callName === 'customer') {
    // Outbound customer leg answered: play the hold message and dial the
    // first agent
    cursors.set(sessionId, 0);
    return VoiceV2CallbackWebhooks.response({
      commands: new CommandsSequenceCreator()
        .text('Please hold while we find an agent.', 'Emma_3', { name: 'hold' })
        .command(dialAgent(0))
        .build(),
    });
  }

  if (event.event === 'call.answered' && callName.startsWith('agent-')) {
    // Agent answered: stop the hold message and bridge them in
    return VoiceV2CallbackWebhooks.response({
      commands: new CommandsSequenceCreator()
        .stopMessages('hold')
        .bridgeCall('hunt-bridge')
        .build(),
    });
  }

  if (FAILED_EVENTS.includes(event.event) && callName.startsWith('agent-')) {
    // Agent didn't connect: advance the cursor and try the next agent
    const index = (cursors.get(sessionId) ?? 0) + 1;
    cursors.set(sessionId, index);
    if (index >= agents.length) {
      // No more agents: apologise and hang up
      cursors.delete(sessionId);
      return VoiceV2CallbackWebhooks.response({
        commands: new CommandsSequenceCreator()
          .text(
            'We are sorry, no agent is available. Please try again later.',
            'Emma_3',
            {
              name: 'noanswer',
              onFinish: Calls.hangup(),
            },
          )
          .build(),
      });
    }
    return VoiceV2CallbackWebhooks.response({ commands: dialAgent(index) });
  }

  if (event.event === 'call.hangup') {
    cursors.delete(sessionId);
  }
  return VoiceV2CallbackWebhooks.response({ commands: [] });
}

app.post('/voice/events', (req, res) => {
  const event = callbackWebhooks.parseEvent(req.body);
  const response = handleEvent(event);
  res
    .status(200)
    .type('application/json')
    .send(callbackWebhooks.serializeResponse(response));
});

app.listen(port, () => {
  console.log(`Hunt webhook server listening on :${port}`);
  console.log('Configure service callBehavior.webhook.url -> https://<your-ngrok>/voice/events');
});
