import { parseEventNotification } from '../../../../src';

describe('Callback Webhook', () => {

  it('should update the timestamp with the Zulu timezone', () => {
    const payload: any = {
      eventId: 'bcd1234efghijklmnop567890',
      timestamp: '2023-06-06T07:45:27.785357',
      projectId: 'abcd12ef-ab12-ab12-bc34-abcdef123456',
      resourceId: '+12345612345',
      resourceType: 'ACTIVE_NUMBER',
      eventType: 'PROVISIONING_TO_CAMPAIGN',
      status: 'FAILED',
      failureCode: 'CAMPAIGN_NOT_AVAILABLE',
    };
    const parsedPayload = parseEventNotification(payload);
    expect(parsedPayload.timestamp instanceof Date).toBeTruthy();
    const expectedDate = new Date('2023-06-06T07:45:27.785357Z');
    expect(parsedPayload.timestamp).toEqual(expectedDate);
  });

  it('should parse the payload correctly even when the date contains a timezone', () => {
    const payload: any = {
      eventId: 'bcd1234efghijklmnop567890',
      timestamp: '2023-06-06T07:45:27.785357Z',
      projectId: 'abcd12ef-ab12-ab12-bc34-abcdef123456',
      resourceId: '+12345612345',
      resourceType: 'ACTIVE_NUMBER',
      eventType: 'PROVISIONING_TO_CAMPAIGN',
      status: 'FAILED',
      failureCode: 'CAMPAIGN_NOT_AVAILABLE',
    };
    const parsedPayload = parseEventNotification(payload);
    expect(parsedPayload.timestamp instanceof Date).toBeTruthy();
    const expectedDate = new Date('2023-06-06T07:45:27.785357Z');
    expect(parsedPayload.timestamp).toEqual(expectedDate);
  });

});
