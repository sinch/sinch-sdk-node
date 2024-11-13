import {
  transformSendingQueuesStatusResponseIntoClientResponse,
} from '../../../../../src/models';
import {
  sendingQueuesStatusResponse,
  sendingQueuesStatusResponseFromApi,
} from './sending-queues-status-response.models';

describe('SendingQueuesStatusResponse', () => {

  it('should convert an API object into a client object', () => {
    const transformedResponse
      = transformSendingQueuesStatusResponseIntoClientResponse(sendingQueuesStatusResponseFromApi);
    expect(transformedResponse).toEqual(sendingQueuesStatusResponse);
  });

});
