import { getBatchIdFromConfig, getRecipientPhoneNumberFromConfig, initSmsClient } from '../../config';
import { DeliveryFeedbackRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('********************');
  console.log('* deliveryFeedback *');
  console.log('********************');

  const batchIdInTheFuture = getBatchIdFromConfig();
  if (!batchIdInTheFuture) {
    throw new Error('No batch id has been provided. '
      + 'Please update your .env file or edit the ./src/sms/batches/delivery-feedback.ts file');
  }

  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  if (!recipientPhoneNumber) {
    throw new Error('No recipient phone number has been provided. '
      + 'Please update your .env file or edit the ./src/sms/batches/delivery-feedback.ts file');
  }

  const requestData: DeliveryFeedbackRequestData= {
    batch_id: batchIdInTheFuture,
    deliveryFeedbackRequestBody: {
      recipients: [
        recipientPhoneNumber,
      ],
    },
  };

  const sinchClient = initSmsClient();

  try {
    await sinchClient.sms.batches.sendDeliveryFeedback(requestData);
  } catch (error) {
    console.error(`ERROR: The delivery feedback could not be sent.`);
    throw error;
  }

  console.log(`Delivery feedback for batch ID ${requestData.batch_id} has been sent!`);

})();
