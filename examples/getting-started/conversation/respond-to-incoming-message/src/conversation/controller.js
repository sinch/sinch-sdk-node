import { ConversationCallbackWebhooks } from '@sinch/sdk-core';
import { handleConversationEvent } from './serverBusinessLogic.js';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * @param { import('express').Express } app
 * @param { import('@sinch/sdk-core').SinchClientParameters } sinchClientParameters
 */
export const conversationController = (app, sinchClientParameters) => {

  app.post('/ConversationEvent', async (req, res) => {
    try {
      const event = ConversationCallbackWebhooks.parseEvent(req.body);
      if (event.trigger === 'MESSAGE_INBOUND') {
        await handleConversationEvent(event, sinchClientParameters);
      } else {
        res.status(200).json({ message: `Unexpected event type for this tutorial: ${event.trigger}` });
      }
    } catch (error) {
      console.error('Error parsing event:', error);
      return res.status(400).json({ error: 'Invalid event format' });
    }
    res.status(200).json();
  });
};
