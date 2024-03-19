import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initSmsServiceWithServicePlanId,
  printFullResponse,
} from '../../config';
import { DryRunRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('***********');
  console.log('* Dry_Run *');
  console.log('***********');

  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  const senderPhoneNumber = getPhoneNumberFromConfig();

  const requestData: DryRunRequestData= {
    dryRunRequestBody: {
      type: 'mt_text',
      to: [
        recipientPhoneNumber,
      ],
      from: senderPhoneNumber,
      parameters: {
        name: {
          [recipientPhoneNumber]: 'John',
          default: 'there',
        },
      },
      body: 'Hi ${name}!',
      delivery_report: 'none',
    },
  };

  const smsService = initSmsServiceWithServicePlanId();
  let response;
  try {
    response = await smsService.batches.dryRun(requestData);
  } catch (error) {
    console.error(`ERROR: The dry run couldn't be performed`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The dry run was successfully performed. 
    The batch wil send ${response.number_of_messages} messages to ${response.number_of_recipients} recipients`);
  } else {
    printFullResponse(response);
  }
})();
