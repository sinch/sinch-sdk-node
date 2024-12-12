import {
  getMailgunDomainFromConfig,
  getMailgunRecipientFromConfig,
  getMailgunSenderFromConfig,
  initMailgunService,
  printFullResponse,
} from '../../config';
import { Mailgun } from '@sinch/sdk-core';

(async () => {
  console.log('*************');
  console.log('* SendEmail *');
  console.log('*************');

  const domainName = getMailgunDomainFromConfig();
  const sender = getMailgunSenderFromConfig();
  const recipient = getMailgunRecipientFromConfig();

  const requestData: Mailgun.SendEmailRequest = {
    from: sender,
    to: recipient,
    subject: 'First email from the Node.js SDK',
    html: 'Hello!<br>This is an email sent with the <span style="color: blue">Node.js SDK</span>.<br>🦦',
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
