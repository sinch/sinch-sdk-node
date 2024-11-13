import {
  transformBadRequestIntoClientResponse,
} from '../../../../../src/models';
import { badRequest, badRequestFromApi } from './bad-request.models';

describe('BadRequest', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse = transformBadRequestIntoClientResponse(badRequestFromApi);
    expect(transformedResponse).toEqual(badRequest);
  });

});
