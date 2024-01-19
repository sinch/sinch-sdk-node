import { parseVoiceEventNotification } from '../../../../src';

describe('Voice Callback Webhook', () => {

  it('should NOT thrown an error when parsing the \'ice\' event', () => {
    const payload = {
      event: 'ice',
      callid: 'callId',
      callResourceUrl: 'https://calling-use1.api.sinch.com/calling/v1/calls/id/callId',
      timestamp: '2023-12-29T15:07:22Z',
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
    const parsedResultFunction = () => parseVoiceEventNotification(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should NOT thrown an error when parsing the \'ace\' event', () => {
    const payload = {
      event: 'ace',
      callid: 'callId',
      timestamp: '2023-12-29T15:07:22Z',
      version: 1,
      applicationKey: 'appKey',
    };
    const parsedResultFunction = () => parseVoiceEventNotification(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should NOT thrown an error when parsing the \'dice\' event', () => {
    const payload = {
      event: 'dice',
      callid: 'callId',
      timestamp: '2023-12-29T15:07:22Z',
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
    const parsedResultFunction = () => parseVoiceEventNotification(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should NOT thrown an error when parsing the \'pie\' event', () => {
    const payload = {
      event: 'pie',
      callid: 'callId',
      timestamp: '2023-12-29T15:07:22Z',
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
    const parsedResultFunction = () => parseVoiceEventNotification(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should NOT thrown an error when parsing the \'notify\' event', () => {
    const payload = {
      event: 'notify',
      callid: 'callId',
      version: 1,
      type: 'recording_finished',
    };
    const parsedResultFunction = () => parseVoiceEventNotification(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should throw an error when parsing a random object', () => {
    const payload = {
      unknownProperty: 'anyValue',
    };
    const parsedResultFunction = () => parseVoiceEventNotification(payload);
    expect(parsedResultFunction).toThrow('Unknown Voice event');
  });

  it('should throw an error when parsing a non-existing event type', () => {
    const payload = {
      event: 'unknown',
    };
    const parsedResultFunction = () => parseVoiceEventNotification(payload);
    expect(parsedResultFunction).toThrow('Unknown Voice event type: unknown');
  });
});
