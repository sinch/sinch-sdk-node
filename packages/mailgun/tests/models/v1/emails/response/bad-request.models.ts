import { Mailgun } from '../../../../../src';
import { BadRequestFromApi } from '../../../../../src/models/v1/emails/response/bad-request/bad-request';

export const badRequestFromApi: BadRequestFromApi = {
  message: 'Invalid storage key',
};

export const badRequest: Mailgun.BadRequest = {
  message: 'Invalid storage key',
};
