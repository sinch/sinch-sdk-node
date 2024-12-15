import { genericResponse, genericResponseFromApi } from './generic-response.models';
import {
  transformGenericResponseIntoClientResponse,
} from '../../../../../src/models/v1/emails/response/generic-response/generic-response.transform';

describe('GenericResponse', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse = transformGenericResponseIntoClientResponse(genericResponseFromApi);
    expect(transformedResponse).toEqual(genericResponse);
  });

});
