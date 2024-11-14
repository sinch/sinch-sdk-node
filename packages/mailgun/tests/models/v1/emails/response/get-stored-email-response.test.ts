import {
  transformGetEmailResponseIntoClientResponse,
} from '../../../../../src/models';
import { getStoredEmailResponse, getStoredEmailResponseFromApi } from './get-stored-email-response.models';

describe('GetEmailResponse', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse = transformGetEmailResponseIntoClientResponse(getStoredEmailResponseFromApi);
    expect(transformedResponse).toEqual(getStoredEmailResponse);
  });

});
