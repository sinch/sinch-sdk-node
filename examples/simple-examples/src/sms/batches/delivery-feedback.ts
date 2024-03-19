import {
  getBatchIdFromConfig,
  getRecipientPhoneNumberFromConfig,
  initSmsServiceWithServicePlanId,
} from '../../config';
import { DeliveryFeedbackRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('********************');
  console.log('* deliveryFeedback *');
  console.log('********************');

  const batchIdInTheFuture = getBatchIdFromConfig();
  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();

  const requestData: DeliveryFeedbackRequestData= {
    batch_id: batchIdInTheFuture,
    deliveryFeedbackRequestBody: {
      recipients: [
        recipientPhoneNumber,
      ],
    },
  };

  const smsService = initSmsServiceWithServicePlanId();

  try {
    await smsService.batches.sendDeliveryFeedback(requestData);
  } catch (error) {
    console.error(`ERROR: The delivery feedback could not be sent.`);
    throw error;
  }

  console.log(`Delivery feedback for batch ID ${requestData.batch_id} has been sent!`);

})();
