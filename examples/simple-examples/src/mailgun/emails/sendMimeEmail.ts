import {
  getMailgunDomainFromConfig,
  getMailgunRecipientFromConfig,
  getMailgunSenderFromConfig,
  initMailgunService,
  printFullResponse,
} from '../../config';
import { Mailgun } from '@sinch/sdk-core';
import MailComposer from 'nodemailer/lib/mail-composer';

(async () => {
  console.log('*****************');
  console.log('* SendMimeEmail *');
  console.log('*****************');

  const domainName = getMailgunDomainFromConfig();
  const sender = getMailgunSenderFromConfig();
  const recipient = getMailgunRecipientFromConfig();

  const data = {
    message: {
      from: sender,
      subject: 'Test Sending mime messages from node',
      text: 'This is a mime message',
      html: 'HTML<br>version<br>of<br>the<br><span style="color: blue">body</span>',
    },
  };
  const mail = new MailComposer(data.message);
  const compiledMessage = await mail.compile().build();

  const requestData: Mailgun.SendMimeEmailRequest= {
    to: recipient,
    message: compiledMessage.toString(),
  };

  const mailgunService = initMailgunService();
  let response;
  try {
    response = await mailgunService.emails.sendMimeEmail(domainName, requestData);
  } catch (error) {
    console.error('Error when sending a message');
    throw error;
  }

  printFullResponse(response);

})();
