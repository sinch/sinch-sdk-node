import { AceRequest, DiceRequest, IceRequest, PieRequest, VoiceCallbackWebhooks } from '../../../../src';
import { SinchClientParameters } from '@sinch/sdk-client';

describe('Voice Callback Webhook', () => {
  let callbackWebhooks: VoiceCallbackWebhooks;
  let sinchClientParameters: SinchClientParameters;

  const CONTENT_TYPE = 'application/json; charset=utf-8';
  const X_TIMESTAMP = 'x-timestamp:2024-01-19T09:19:28.9372196Z';
  const PATH = '/webhook';
  const BODY = '{"id":"018d2104-aaa-bbbb-1234","price":{"amount":0.0308},"rate":{"amount":0.0}}';
  const METHOD = 'POST';

  const DATE_AS_STRING = '2023-12-29T15:07:22Z';
  const DATE_AS_DATE = new Date(DATE_AS_STRING);

  beforeEach(() => {
    sinchClientParameters = {
      applicationKey: 'app-key',
      applicationSecret: 'app-secret',
    };
    callbackWebhooks = new VoiceCallbackWebhooks(sinchClientParameters);
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

  it('should NOT thrown an error when parsing the \'ice\' event', () => {
    const payload = {
      event: 'ice',
      callid: 'callId',
      callResourceUrl: 'https://calling-use1.api.sinch.com/calling/v1/calls/id/callId',
      timestamp: DATE_AS_STRING,
      version: 1,
      cli: '1234567890',
      to: {
        type: 'did',
        endpoint: '+1234567770',
      },
      domain: 'pstn',
      applicationKey: 'appKey',
      originationType: 'PSTN',
      rdnis: '',
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
    const parsedResult = parsedResultFunction() as IceRequest;
    expect(parsedResult.timestamp).toStrictEqual(DATE_AS_DATE);
  });

  it('should NOT thrown an error when parsing the \'ace\' event', () => {
    const payload = {
      event: 'ace',
      callid: 'callId',
      timestamp: DATE_AS_STRING,
      version: 1,
      applicationKey: 'appKey',
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
    const parsedResult = parsedResultFunction() as AceRequest;
    expect(parsedResult.timestamp).toStrictEqual(DATE_AS_DATE);
  });

  it('should NOT thrown an error when parsing the \'dice\' event', () => {
    const payload = {
      event: 'dice',
      callid: 'callId',
      timestamp: DATE_AS_STRING,
      reason: 'MANAGERHANGUP',
      result: 'ANSWERED',
      version: 1,
      debit: {
        currencyId: 'EUR',
        amount: 0.1758,
      },
      userRate: {
        currencyId: 'EUR',
        amount: 0.1758,
      },
      to: {
        type: 'number',
        endpoint: '1234567770',
      },
      applicationKey: 'appKey',
      duration: 16,
      from: '1234567890',
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
    const parsedResult = parsedResultFunction() as DiceRequest;
    expect(parsedResult.timestamp).toStrictEqual(DATE_AS_DATE);
  });

  it('should NOT thrown an error when parsing the \'pie\' event', () => {
    const payload = {
      event: 'pie',
      callid: 'callId',
      timestamp: DATE_AS_STRING,
      menuResult: {
        addToContext: [],
        type: 'sequence',
        value: '6789',
        menuId: 'confirm',
        inputMethod: 'dtmf',
      },
      version: 1,
      applicationKey: 'appKey',
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
    const parsedResult = parsedResultFunction() as PieRequest;
    expect(parsedResult.timestamp).toStrictEqual(DATE_AS_DATE);
  });

  it('should NOT thrown an error when parsing the \'notify\' event', () => {
    const payload = {
      event: 'notify',
      callid: 'callId',
      version: 1,
      type: 'recording_finished',
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should throw an error when parsing a random object', () => {
    const payload = {
      unknownProperty: 'anyValue',
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).toThrow('Unknown Voice event');
  });

  it('should throw an error when parsing a non-existing event type', () => {
    const payload = {
      event: 'unknown',
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).toThrow('Unknown Voice event type: unknown');
  });
});
