import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initSmsClient,
  printFullResponse,
} from '../../config';
import { DryRunRequestData, TextRequest } from '@sinch/sdk-core';

(async () => {
  console.log('***********');
  console.log('* Dry_Run *');
  console.log('***********');

  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  if (!recipientPhoneNumber) {
    throw new Error('No recipient phone number has been provided. '
      + 'Please update your .env file or edit the ./src/sms/batches/dry-run.ts file');
  }

  const senderPhoneNumber = getPhoneNumberFromConfig();
  if (!senderPhoneNumber) {
    throw new Error('No sender phone number has been provided. '
      + 'Please update your .env file or edit the ./src/sms/batches/dry-run.ts file');
  }

  const requestData: DryRunRequestData= {
    dryRunRequestBody: {
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
      type: 'mt_text',
    } as TextRequest,
  };

  const sinchClient = initSmsClient();
  let response;
  try {
    response = await sinchClient.sms.batches.dryRun(requestData);
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
