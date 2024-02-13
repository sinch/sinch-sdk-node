import { VerificationCallbackWebhooks } from '../../../../src';
import { SinchClientParameters } from '@sinch/sdk-client';

describe('Verification Callback Webhook', () => {
  let callbackWebhooks: VerificationCallbackWebhooks;
  let sinchClientParameters: SinchClientParameters;

  const CONTENT_TYPE = 'application/json; charset=utf-8';
  const X_TIMESTAMP = 'x-timestamp:2024-01-19T09:19:28.9372196Z';
  const PATH = '/webhook';
  const BODY = `{"id":"018d2104-aaa-bbbb-1234","price":{"amount":0.0308},"rate":{"amount":0.0}}`;
  const METHOD = 'POST';

  beforeEach(() => {
    sinchClientParameters = {
      applicationKey: 'app-key',
      applicationSecret: 'app-secret',
    };
    callbackWebhooks = new VerificationCallbackWebhooks(sinchClientParameters);
  });

  it('should authorize a valid authorization header', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': 'Application app-key:wC8XcoLQ22cxrOsUqqbWk+LHJ82wtqR/IgeIp9NG8LY=',
    };
    const validationStatus = callbackWebhooks.validateAuthenticationHeader(
      headers, BODY, PATH, METHOD,
    );
    expect(validationStatus).toBeTruthy();
  });

  it('should reject an invalid authorization header', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': 'Application app-key:invalid-signature',
    };
    const validationStatus = callbackWebhooks.validateAuthenticationHeader(
      headers, BODY, PATH, METHOD,
    );
    expect(validationStatus).toBeFalsy();
  });

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
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
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
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should throw an error when parsing a random object', () => {
    const payload = {
      unknownProperty: 'anyValue',
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).toThrow('Unknown Verification event');
  });

  it('should throw an error when parsing a non-existing event type', () => {
    const payload = {
      event: 'unknown',
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).toThrow('Unknown Verification event type: unknown');
  });

});
