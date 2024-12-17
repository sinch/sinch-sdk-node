import { sendEmailResponse, sendEmailResponseFromApi } from './send-email-response.models';
import {
  transformSendEmailResponseIntoClientResponse,
} from '../../../../../src/models/v1/emails/response/send-email-response/send-email-response.transform';

describe('SendEmailResponse', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse = transformSendEmailResponseIntoClientResponse(sendEmailResponseFromApi);
    expect(transformedResponse).toEqual(sendEmailResponse);
  });

});
