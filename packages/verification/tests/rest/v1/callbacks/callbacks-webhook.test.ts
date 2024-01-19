import { parseVerificationEventNotification } from '../../../../src';

describe('Verification Callback Webhook', () => {

  it('should NOT thrown an error when parsing the \'VerificationRequestEvent\' event', () => {
    const payload = {
      event: 'VerificationRequestEvent',
      id: 'eventId',
      method: 'sms',
      identity: {
        type: 'number',
        endpoint: '+1234567890',
      },
    };
    const parsedResultFunction = () => parseVerificationEventNotification(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should NOT thrown an error when parsing the \'VerificationResultEvent\' event', () => {
    const payload = {
      event: 'VerificationResultEvent',
      id: 'eventId',
      method: 'sms',
      identity: {
        type: 'number',
        endpoint: '+1234567890',
      },
      status: 'status',
    };
    const parsedResultFunction = () => parseVerificationEventNotification(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should throw an error when parsing a random object', () => {
    const payload = {
      unknownProperty: 'anyValue',
    };
    const parsedResultFunction = () => parseVerificationEventNotification(payload);
    expect(parsedResultFunction).toThrow('Unknown Verification event');
  });

  it('should throw an error when parsing a non-existing event type', () => {
    const payload = {
      event: 'unknown',
    };
    const parsedResultFunction = () => parseVerificationEventNotification(payload);
    expect(parsedResultFunction).toThrow('Unknown Verification event type: unknown');
  });

});
