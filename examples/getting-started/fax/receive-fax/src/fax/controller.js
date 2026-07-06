import { FaxCallbackWebhooks } from '@sinch/sdk-core';
import { handleIncomingFaxEvent } from './serverBusinessLogic.js';

/**
 * @param { import('express').Express } app
 */
export const faxController = (app) => {

  app.post('/', async (req, res) => {
    try {
      const event = FaxCallbackWebhooks.parseEvent(req.body);
      if (event.event === 'INCOMING_FAX') {
        await handleIncomingFaxEvent(event);
      } else {
        console.log(`Unexpected event type for this tutorial: ${event.event}`);
      }
    } catch (error) {
      console.error('Error parsing event:', error);
      return res.status(400).json({ error: 'Invalid event format' });
    }
    res.sendStatus(200);
  });
};
