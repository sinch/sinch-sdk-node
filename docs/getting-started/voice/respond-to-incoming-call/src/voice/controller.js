import { VoiceCallbackWebhooks } from '@sinch/sdk-core';
import { handleDisconnectedCallEvent, handleIncomingCallEvent } from './serverBusinessLogic.js';

export const voiceController = (app) => {

  app.post('/VoiceEvent', async (req, res) => {

    let response;

    try {
      const event = VoiceCallbackWebhooks.parseEvent(req.body);
      switch (event.event) {
        case 'ice':
          response = handleIncomingCallEvent(event);
          break;
        case 'dice':
          response = handleDisconnectedCallEvent(event);
          break;
        default:
          res.status(200).json({ message: `Unexpected event type for this tutorial: ${event.trigger}` });
      }
    } catch (error) {
      console.error('Error parsing event:', error);
      return res.status(400).json({ error: 'Invalid event format' });
    }

    return res.status(200).json(response);
  });
};
