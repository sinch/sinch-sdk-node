import { Fax, FaxCallbackWebhooks } from '../../../../src';

describe('Fax Callback Webhook', () => {
  let callbackWebhooks: FaxCallbackWebhooks;

  const EVENT_TIME_AS_STRING = '2026-04-09T21:33:46Z';
  const EVENT_TIME_AS_DATE = new Date(EVENT_TIME_AS_STRING);
  const CREATE_TIME_AS_STRING = '2026-04-08T14:23:48Z';
  const CREATE_TIME_AS_DATE = new Date(CREATE_TIME_AS_STRING);
  const COMPLETED_TIME_AS_STRING = '2026-04-08T14:25:00Z';
  const COMPLETED_TIME_AS_DATE = new Date(COMPLETED_TIME_AS_STRING);

  const FAX_OBJECT = {
    id: '01KNPQW6SGZKAZEX8ZX7MCN559',
    direction: 'INBOUND',
    from: '+16179216545',
    to: '+17818510006',
    numberOfPages: 1,
    status: 'COMPLETED',
    createTime: CREATE_TIME_AS_STRING,
    completedTime: COMPLETED_TIME_AS_STRING,
    projectId: '37b62a7b-0177-429a-bb0b-e10f848de0b8',
    serviceId: '01HQK89SYWBCJK1DMYD3QAW2DW',
  };

  beforeEach(() => {
    callbackWebhooks = new FaxCallbackWebhooks();
  });

  it('should parse an INCOMING_FAX event from an object payload', () => {
    const payload = {
      event: 'INCOMING_FAX',
      eventTime: EVENT_TIME_AS_STRING,
      fax: { ...FAX_OBJECT },
    };
    const result = callbackWebhooks.parseEvent(payload) as Fax.IncomingFaxEvent;
    expect(result.event).toBe('INCOMING_FAX');
    expect(result.eventTime).toStrictEqual(EVENT_TIME_AS_DATE);
    expect(result.fax).toBeDefined();
    expect(result.fax!.id).toBe('01KNPQW6SGZKAZEX8ZX7MCN559');
    expect(result.fax!.createTime).toStrictEqual(CREATE_TIME_AS_DATE);
  });

  it('should parse a FAX_COMPLETED event from an object payload', () => {
    const payload = {
      event: 'FAX_COMPLETED',
      eventTime: EVENT_TIME_AS_STRING,
      fax: { ...FAX_OBJECT },
    };
    const result = callbackWebhooks.parseEvent(payload) as Fax.FaxCompletedEvent;
    expect(result.event).toBe('FAX_COMPLETED');
    expect(result.eventTime).toStrictEqual(EVENT_TIME_AS_DATE);
    expect(result.fax).toBeDefined();
    expect(result.fax!.id).toBe('01KNPQW6SGZKAZEX8ZX7MCN559');
    expect(result.fax!.createTime).toStrictEqual(CREATE_TIME_AS_DATE);
  });

  it('should parse an INCOMING_FAX event from a JSON string', () => {
    const payload = JSON.stringify({
      event: 'INCOMING_FAX',
      eventTime: EVENT_TIME_AS_STRING,
      fax: { ...FAX_OBJECT },
    });
    const result = callbackWebhooks.parseEvent(payload) as Fax.IncomingFaxEvent;
    expect(result.event).toBe('INCOMING_FAX');
    expect(result.eventTime).toStrictEqual(EVENT_TIME_AS_DATE);
    expect(result.fax!.id).toBe('01KNPQW6SGZKAZEX8ZX7MCN559');
    expect(result.fax!.createTime).toStrictEqual(CREATE_TIME_AS_DATE);
  });

  it('should parse a FAX_COMPLETED event from a JSON string', () => {
    const payload = JSON.stringify({
      event: 'FAX_COMPLETED',
      eventTime: EVENT_TIME_AS_STRING,
      fax: { ...FAX_OBJECT },
    });
    const result = callbackWebhooks.parseEvent(payload) as Fax.FaxCompletedEvent;
    expect(result.event).toBe('FAX_COMPLETED');
    expect(result.eventTime).toStrictEqual(EVENT_TIME_AS_DATE);
    expect(result.fax!.id).toBe('01KNPQW6SGZKAZEX8ZX7MCN559');
    expect(result.fax!.createTime).toStrictEqual(CREATE_TIME_AS_DATE);
  });

  it('should parse an INCOMING_FAX event from a multipart/form-data body with CRLF', () => {
    const boundary = '----Boundary123';
    const faxJson = JSON.stringify(FAX_OBJECT);
    const multipartBody = [
      `--${boundary}`,
      'Content-Disposition: form-data; name="event"',
      '',
      'INCOMING_FAX',
      `--${boundary}`,
      'Content-Disposition: form-data; name="eventTime"',
      '',
      EVENT_TIME_AS_STRING,
      `--${boundary}`,
      'Content-Disposition: form-data; name="fax"',
      'Content-Type: application/json',
      '',
      faxJson,
      `--${boundary}--`,
    ].join('\r\n');

    const result = callbackWebhooks.parseEvent(multipartBody) as Fax.IncomingFaxEvent;
    expect(result.event).toBe('INCOMING_FAX');
    expect(result.eventTime).toStrictEqual(EVENT_TIME_AS_DATE);
    expect(result.fax).toBeDefined();
    expect(result.fax!.id).toBe('01KNPQW6SGZKAZEX8ZX7MCN559');
    expect(result.fax!.createTime).toStrictEqual(CREATE_TIME_AS_DATE);
    expect(result.fax!.completedTime).toStrictEqual(COMPLETED_TIME_AS_DATE);
  });

  it('should parse a FAX_COMPLETED event from a multipart/form-data body with CRLF', () => {
    const boundary = '----Boundary123';
    const faxJson = JSON.stringify(FAX_OBJECT);
    const multipartBody = [
      `--${boundary}`,
      'Content-Disposition: form-data; name="event"',
      '',
      'FAX_COMPLETED',
      `--${boundary}`,
      'Content-Disposition: form-data; name="eventTime"',
      '',
      EVENT_TIME_AS_STRING,
      `--${boundary}`,
      'Content-Disposition: form-data; name="fax"',
      'Content-Type: application/json',
      '',
      faxJson,
      `--${boundary}--`,
    ].join('\r\n');

    const result = callbackWebhooks.parseEvent(multipartBody) as Fax.FaxCompletedEvent;
    expect(result.event).toBe('FAX_COMPLETED');
    expect(result.eventTime).toStrictEqual(EVENT_TIME_AS_DATE);
    expect(result.fax).toBeDefined();
    expect(result.fax!.id).toBe('01KNPQW6SGZKAZEX8ZX7MCN559');
    expect(result.fax!.createTime).toStrictEqual(CREATE_TIME_AS_DATE);
    expect(result.fax!.completedTime).toStrictEqual(COMPLETED_TIME_AS_DATE);
  });

  it('should parse an event without eventTime', () => {
    const payload = {
      event: 'INCOMING_FAX',
      fax: { ...FAX_OBJECT },
    };
    const result = callbackWebhooks.parseEvent(payload) as Fax.IncomingFaxEvent;
    expect(result.event).toBe('INCOMING_FAX');
    expect(result.eventTime).toBeUndefined();
    expect(result.fax!.id).toBe('01KNPQW6SGZKAZEX8ZX7MCN559');
  });

  it('should parse an event using the static method', () => {
    const payload = {
      event: 'INCOMING_FAX',
      eventTime: EVENT_TIME_AS_STRING,
      fax: { ...FAX_OBJECT },
    };
    const result = FaxCallbackWebhooks.parseEvent(payload) as Fax.IncomingFaxEvent;
    expect(result.event).toBe('INCOMING_FAX');
    expect(result.eventTime).toStrictEqual(EVENT_TIME_AS_DATE);
    expect(result.fax!.id).toBe('01KNPQW6SGZKAZEX8ZX7MCN559');
  });

  it('should always return true for authentication validation', () => {
    const result = callbackWebhooks.validateAuthenticationHeader({}, '', '/fax', 'POST');
    expect(result).toBeTruthy();
  });

  it('should throw an error when the event type is unknown', () => {
    const payload = {
      event: 'UNKNOWN_EVENT',
      eventTime: EVENT_TIME_AS_STRING,
    };
    expect(() => callbackWebhooks.parseEvent(payload)).toThrow('Unknown Fax event: UNKNOWN_EVENT');
  });

  it('should throw an error when the event property is missing', () => {
    const payload = {
      eventTime: EVENT_TIME_AS_STRING,
    };
    expect(() => callbackWebhooks.parseEvent(payload)).toThrow('Unknown Fax event');
  });

  it('should throw an error when parsing an invalid JSON string', () => {
    expect(() => callbackWebhooks.parseEvent('not valid json')).toThrow();
  });

  it('should throw an error when parsing a multipart body with no detectable boundary', () => {
    // A string starting with "--" but with no actual content
    expect(() => callbackWebhooks.parseEvent('--\r\n')).toThrow('Unable to detect multipart boundary from the body');
  });
});
