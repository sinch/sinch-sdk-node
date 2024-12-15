import { Mailgun } from '../../../../../src';
import { EmailNotFoundFromApi } from '../../../../../src/models/v1/emails/response/email-not-found/email-not-found';

export const emailNotFoundFromApi: EmailNotFoundFromApi = {
  message: 'Message not found',
};

export const emailNotFound: Mailgun.EmailNotFound = {
  message: 'Message not found',
};
