import {
  getMailgunDomainFromConfig,
  getMailgunRecipientFromConfig,
  getMailgunSenderFromConfig, getMailgunTemplateNameFromConfig,
  initMailgunService,
  printFullResponse,
} from '../../config';
import { Mailgun } from '@sinch/sdk-core';
import { createReadStream, promises as fsPromises } from 'fs';
import path from 'path';

(async () => {
  console.log('*************');
  console.log('* SendEmail *');
  console.log('*************');

  const domainName = getMailgunDomainFromConfig();
  const sender = getMailgunSenderFromConfig();
  const recipient = getMailgunRecipientFromConfig();
  const templateName = getMailgunTemplateNameFromConfig();

  const sinchLogo: Mailgun.EmailAttachment = {
    filename: 'logo.png',
    data: await fsPromises.readFile(path.join(__dirname, '..', 'attachments', 'sinch-logo.png')),
  };

  const receipt: Mailgun.EmailAttachment = {
    filename: 'receipt.txt',
    data: 'This is your receipt',
  };

  const requestData: Mailgun.SendEmailRequest = {
    from: sender,
    to: recipient,
    subject: 'First email from the Node.js SDK',
    template: templateName,
    templateProperties: {
      version: 'initial',
      variables: {
        param: 'The Gourmet Whale',
        orders: [
          {
            id: 123,
            name: 'Dark Chocolate Box',
          },
          {
            id: 456,
            name: 'Calissons x12',
          },
        ],
      },
    },
    inline: sinchLogo,
    attachment: receipt,
    text: 'Fallback text for text-only email clients',
    recipientVariables: {
      [recipient]: {
        name: 'John',
      },
    },
    overrideProperties: {
      tag: ['test', 'sdk-node'],
    },
    customHeaders: {
      'X-sent-by': 'Node.js SDK',
    },
    customVariables: {
      'message_id': 123,
    },
  };

  const mailgunService = initMailgunService();
  let response;
  try {
    response = await mailgunService.emails.sendEmail(domainName, requestData);
  } catch (error) {
    console.error('Error when sending a message');
    throw error;
  }

  printFullResponse(response);

})();
