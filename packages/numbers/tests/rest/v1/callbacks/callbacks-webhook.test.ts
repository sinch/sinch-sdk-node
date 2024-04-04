import { NumbersCallbackWebhooks } from '../../../../src';

describe('Callback Webhook', () => {
  let callbackWebhooks: NumbersCallbackWebhooks;
  let callbackSecret: string;

  // eslint-disable-next-line max-len
  const BODY = '{"eventId":"01hpa0mww4m79q8j2dwn3ggbgz","timestamp":"2024-02-10T17:22:09.412722588","projectId":"37b62a7b-0177-abcd-efgh-e10f848de123","resourceId":"+17818510001","resourceType":"ACTIVE_NUMBER","eventType":"DEPROVISIONING_FROM_VOICE_PLATFORM","status":"SUCCEEDED","failureCode":null}';

  beforeEach(() => {
    callbackSecret = 'callback-secret';
    callbackWebhooks = new NumbersCallbackWebhooks(callbackSecret);
  });

  it('should authorize a valid signature header', () => {
    const headers = {
      'X-Sinch-Signature': 'dcf80daac2f232f4b23d5f719db3aa0fdca6af43',
    };
    const validationStatus = callbackWebhooks.validateAuthenticationHeader(
      headers, BODY,
    );
    return expect(validationStatus).toBeTruthy();
  });

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
    const parsedPayload = callbackWebhooks.parseEvent(payload);
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
    const parsedPayload = callbackWebhooks.parseEvent(payload);
    expect(parsedPayload.timestamp instanceof Date).toBeTruthy();
    const expectedDate = new Date('2023-06-06T07:45:27.785357Z');
    expect(parsedPayload.timestamp).toEqual(expectedDate);
  });

});
