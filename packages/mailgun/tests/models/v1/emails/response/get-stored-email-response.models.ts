import { Mailgun } from '../../../../../src';
import { GetStoredEmailResponseFromApi } from '../../../../../src/models/v1/emails/response/get-email-response/get-stored-email-response';

export const getStoredEmailResponseFromApi: GetStoredEmailResponseFromApi = {
  'X-Mailgun-Deliver-By': new Date('Wed, 06 Jun 2024 07:40:00 +0000'),
  subject: '"Mailgun is awesome"',
  Subject: '"Mailgun is awesome"',
  'stripped-html': '<html>This is some html</html>',
  'Content-Type': 'text/html; charset=ascii',
  'stripped-text': 'This is some html',
  'stripped-signature': 'This is a signature',
  from: 'foo.bar@my-domain.com',
  From: 'foo.bar@my-domain.com',
  'body-plain': 'This is some html',
  'Content-Transfer-Encoding': '7bit',
  'message-headers': [
    ['Mime-Version', '1.0'],
    ['Subject', '"Mailgun is awesome"'],
    ['From', 'foo.bar@my-domain.com'],
    ['To', 'cool.barr@cool.com, bar.baz@gmail.com'],
    ['X-Mailgun-Deliver-By', new Date('Wed, 06 Jun 2024 07:40:00 +0000')],
    ['Message-Id', '<xxxxxxxxxxxxx.111111111111111@my-domain.com>'],
    ['Content-Transfer-Encoding', '7bit'],
    ['Content-Type', 'text/html; charset=ascii'],
  ],
  recipients: 'cool.barr@cool.com, bar.baz@gmail.com',
  To: 'cool.barr@cool.com, bar.baz@gmail.com',
  sender: 'foo.bar@my-domain.com',
  'body-html': '<html>This is some html</html>',
  'Message-Id': '<xxxxxxxxxxxxx.111111111111111@my-domain.com>',
  'Mime-Version': '1.0',
};

export const getStoredEmailResponse: Mailgun.GetStoredEmailResponse = {
  sender: 'foo.bar@my-domain.com',
  recipients: 'cool.barr@cool.com, bar.baz@gmail.com',
  from: 'foo.bar@my-domain.com',
  subject: '"Mailgun is awesome"',
  bodyHtml: '<html>This is some html</html>',
  bodyPlain: 'This is some html',
  messageHeaders: {
    'Content-Transfer-Encoding': '7bit',
    'Content-Type': 'text/html; charset=ascii',
    'From': 'foo.bar@my-domain.com',
    'Message-Id': '<xxxxxxxxxxxxx.111111111111111@my-domain.com>',
    'Mime-Version': '1.0',
    'Subject': '"Mailgun is awesome"',
    'To': 'cool.barr@cool.com, bar.baz@gmail.com',
    'X-Mailgun-Deliver-By': new Date('Wed, 06 Jun 2024 07:40:00 +0000'),
  },
  strippedHtml: '<html>This is some html</html>',
  strippedText: 'This is some html',
  strippedSignature: 'This is a signature',
};
