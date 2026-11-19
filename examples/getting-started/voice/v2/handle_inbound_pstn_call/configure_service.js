import * as dotenv from 'dotenv';
import { SinchClient, Voice } from '@sinch/sdk-core';

async function main() {
  dotenv.config();

  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';
  const serviceId = process.env.SINCH_SERVICE_ID || 'MY_SERVICE_ID';
  const webhookUrl = process.env.WEBHOOK_URL || 'MY_WEBHOOK_URL';

  const sinchClient = new SinchClient({
    projectId,
    keyId,
    keySecret,
  });

  const { CallBehaviorHelper } = Voice.v2;

  // Send the service's call events to the webhook server, with the same URL as fallback
  const response = await sinchClient.voice.v2.services.update({
    serviceId,
    updateServiceRequestBody: {
      callBehavior: CallBehaviorHelper.webhook({
        url: webhookUrl,
        fallbackUrl: webhookUrl,
      }),
    },
  });

  console.log('Service updated:');
  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
