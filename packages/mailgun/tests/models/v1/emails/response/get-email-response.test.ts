import {
  transformGetEmailResponseIntoClientResponse,
} from '../../../../../src/models';
import { getEmailResponse, getEmailResponseFromApi } from './get-email-response.models';

describe('GetEmailResponse', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse = transformGetEmailResponseIntoClientResponse(getEmailResponseFromApi);
    expect(transformedResponse).toEqual(getEmailResponse);
  });

});
