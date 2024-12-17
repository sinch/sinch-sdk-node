import { badRequest, badRequestFromApi } from './bad-request.models';
import { transformBadRequestIntoClientResponse } from '../../../../../src/models/v1/emails/response/bad-request/bad-request.transform';

describe('BadRequest', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse = transformBadRequestIntoClientResponse(badRequestFromApi);
    expect(transformedResponse).toEqual(badRequest);
  });

});
