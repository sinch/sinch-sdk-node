import { SmsCallbackWebhooks } from '@sinch/sdk-core';
import { handleSmsEvent } from './serverBusinessLogic.js';
import * as dotenv from 'dotenv';
dotenv.config();

export const smsController = (app, sinchClientParameters) => {

  app.post('/SmsEvent', async (req, res) => {
    try {
      const event = SmsCallbackWebhooks.parseEvent(req.body);
      if (event.type === 'mo_text') {
        await handleSmsEvent(event, sinchClientParameters);
      } else {
        res.status(200).json({ message: `Unexpected event type for this tutorial: ${event.type}` });
      }
    } catch (error) {
      console.error('Error parsing event:', error);
      return res.status(400).json({ error: 'Invalid event format' });
    }
    res.status(200).json();
  });
};
