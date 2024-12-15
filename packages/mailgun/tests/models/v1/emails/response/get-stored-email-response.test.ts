import { getStoredEmailResponse, getStoredEmailResponseFromApi } from './get-stored-email-response.models';
import {
  transformGetEmailResponseIntoClientResponse,
} from '../../../../../src/models/v1/emails/response/get-email-response/get-stored-email-response.transform';

describe('GetEmailResponse', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse = transformGetEmailResponseIntoClientResponse(getStoredEmailResponseFromApi);
    expect(transformedResponse).toEqual(getStoredEmailResponse);
  });

});
