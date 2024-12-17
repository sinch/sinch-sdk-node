import { emailNotFound, emailNotFoundFromApi } from './email-not-found.models';
import { transformEmailNotFoundIntoClientResponse } from '../../../../../src/models/v1/emails/response/email-not-found/email-not-found.transform';

describe('EmailNotFound', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse = transformEmailNotFoundIntoClientResponse(emailNotFoundFromApi);
    expect(transformedResponse).toEqual(emailNotFound);
  });

});
