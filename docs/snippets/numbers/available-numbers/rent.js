/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

(async () => {
  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';

  const phoneNumberToBeRented = 'AVAILABLE_PHONE_NUMBER_TO_BE_RENTED';
  const servicePlanIdToAssociateWithTheNumber = process.env.SINCH_SERVICE_PLAN_ID || 'MY_SERVICE_PLAN_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  const response = await sinch.numbers.rent({
    phoneNumber: phoneNumberToBeRented,
    rentNumberRequestBody: {
      smsConfiguration: {
        servicePlanId: servicePlanIdToAssociateWithTheNumber,
      },
    },
  });

  console.log(`Rented number:\n${JSON.stringify(response, null, 2)}`);
})();
