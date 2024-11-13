import {
  transformGenericResponseIntoClientResponse,
} from '../../../../../src/models';
import { genericResponse, genericResponseFromApi } from './generic-response.models';

describe('GenericResponse', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse = transformGenericResponseIntoClientResponse(genericResponseFromApi);
    expect(transformedResponse).toEqual(genericResponse);
  });

});
