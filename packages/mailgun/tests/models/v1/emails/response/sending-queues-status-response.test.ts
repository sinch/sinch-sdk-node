import {
  sendingQueuesStatusResponse,
  sendingQueuesStatusResponseFromApi,
} from './sending-queues-status-response.models';
import {
  transformSendingQueuesStatusResponseIntoClientResponse,
// eslint-disable-next-line max-len
} from '../../../../../src/models/v1/emails/response/sending-queues-status-response/sending-queues-status-response.transform';

describe('SendingQueuesStatusResponse', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse
      = transformSendingQueuesStatusResponseIntoClientResponse(sendingQueuesStatusResponseFromApi);
    expect(transformedResponse).toEqual(sendingQueuesStatusResponse);
  });

});
