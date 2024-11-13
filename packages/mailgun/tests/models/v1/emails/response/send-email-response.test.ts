import {
  transformSendEmailResponseIntoClientResponse,
} from '../../../../../src/models';
import { sendEmailResponse, sendEmailResponseFromApi } from './send-email-response.models';

describe('SendEmailResponse', () => {



  it('should convert an API object into a client object', () => {
    const transformedResponse = transformSendEmailResponseIntoClientResponse(sendEmailResponseFromApi);
    expect(transformedResponse).toEqual(sendEmailResponse);
  });

});
