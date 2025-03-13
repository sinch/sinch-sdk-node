import {
  getMailgunDomainFromConfig,
  getMailgunRecipientFromConfig,
  getMailgunSenderFromConfig,
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

  // The attachment can be built in various ways:
  // 1. As a structured object, using the Mailgun.EmailAttachment interface
  // By specifying the filename, you can reference the attachment in the email body with it (e.g.: "cid:logo.png")
  const sinchLogo: Mailgun.EmailAttachment = {
    filename: 'logo.png',
    data: await fsPromises.readFile(path.join(__dirname, '..', 'attachments', 'sinch-logo.png')),
  };

  // 2. As a Buffer, from a file read with fsPromises.readFile
  // If no filename is specified, the attachment can be referenced with `file` in the email body (e.g.: "cid:file")
  const sinchLogoAttached = await fsPromises.readFile(path.join(__dirname, '..', 'attachments', 'sinch-logo.png'));

  // 3. As a Buffer, created with Buffer.from
  // It will be base64-encoded and sent as an application/octet-stream with `file` as the filename
  const bufferTextAttachment = Buffer.from('file content');

  // 4. As a string directly
  // It will be base64-encoded and sent as an application/octet-stream with `file` as the filename
  const stringAttachment = 'This is a file text content';

  // 5. As a ReadableStream, using fs.createReadStream
  // You can reference the attachment in the email body with its name (e.g.: "cid:sinch-logo.png")
  const mailgunLogo = createReadStream(path.join(__dirname, '..', 'attachments', 'mailgun-logo.png'));

  const fileAttachment: Mailgun.EmailAttachment = {
    data: createReadStream(path.join(__dirname, '..', 'attachments', 'YouVeGotMail.pdf')),
    filename: 'you-ve-got-mail.pdf',
    contentType: 'application/pdf',
  };

  const requestData: Mailgun.SendEmailRequest = {
    from: sender,
    to: recipient,
    subject: 'First email from the Node.js SDK',
    html: 'Hello %recipient.name%!'
      + '<br>This is an email sent with the <span style="color: blue">Node.js SDK</span>.'
      + '<br>🦦'
      + '<br><img src="cid:logo.png" alt="Sinch logo" width="100px">'
      + '<br><img src="cid:file" alt="Mailgun logo mini" width="50px">',
    inline: [sinchLogo, mailgunLogo],
    attachment: [
      sinchLogoAttached,
      bufferTextAttachment,
      stringAttachment,
      fileAttachment,
    ],
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
