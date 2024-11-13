import {
  transformEmailNotFoundIntoClientResponse,
} from '../../../../../src/models';
import { emailNotFound, emailNotFoundFromApi } from './email-not-found.models';

describe('EmailNotFound', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse = transformEmailNotFoundIntoClientResponse(emailNotFoundFromApi);
    expect(transformedResponse).toEqual(emailNotFound);
  });

});
