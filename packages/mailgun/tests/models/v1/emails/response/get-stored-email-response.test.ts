import { getStoredEmailResponse, getStoredEmailResponseFromApi } from './get-stored-email-response.models';
import {
  transformGetStoredEmailResponseIntoClientResponse,
} from '../../../../../src/models/v1/emails/response/get-stored-email-response/get-stored-email-response.transform';

describe('GetEmailResponse', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse = transformGetStoredEmailResponseIntoClientResponse(getStoredEmailResponseFromApi);
    expect(transformedResponse).toEqual(getStoredEmailResponse);
  });

});
