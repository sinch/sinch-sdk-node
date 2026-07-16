import express from 'express';
import { SinchClient } from '@sinch/sdk-core';
import { faxController } from './fax/controller.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

/** @type {import('@sinch/sdk-core').SinchClientParameters} */
const sinchClientParameters = {
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_KEY_ID,
  keySecret: process.env.SINCH_KEY_SECRET,
};

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

faxController(app);

const updateIncomingWebhookUrl = async () => {
  const serviceId = process.env.SINCH_FAX_SERVICE_ID;
  const webhookUrl = process.env.WEBHOOK_URL;

  if (!serviceId || !webhookUrl) {
    return;
  }

  const sinchClient = new SinchClient(sinchClientParameters);
  const response = await sinchClient.fax.services.update({
    serviceId,
    updateServiceRequestBody: {
      incomingWebhookUrl: webhookUrl,
      webhookContentType: 'application/json',
    },
  });

  console.log(`Incoming webhook URL updated to ${response.incomingWebhookUrl}`);
};

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  try {
    await updateIncomingWebhookUrl();
  } catch (error) {
    console.error('Failed to update incoming webhook URL:', error);
  }
});
