import { Voice, VoiceV2SinchEvents } from '../../../../src';

describe('Voice v2 Sinch Events', () => {
  let sinchEvents: VoiceV2SinchEvents;

  const SERVICE_ID = 'a74b1566-0f18-4f8e-9c23-8e6b5df8fd3e';
  const SERVICE_SECRET = 'F5wrP9SKYU6w8sbZXkp7GA==';
  const CONTENT_TYPE = 'application/json; charset=utf-8';
  const X_TIMESTAMP = '2026-04-01T12:00:00.0000000Z';
  const PATH = '/voice-webhooks';
  const METHOD = 'POST';
  const BODY = '{"event":"call.incoming","call":{"callId":"01AN4Z07BY79KA1307SR9X4MV3"}}';
  const VALID_AUTHORIZATION
    = 'service a74b1566-0f18-4f8e-9c23-8e6b5df8fd3e:EWFtVTrykdhMTdyYSbn40GBJpf5UBeggO9T99sdwLyY=';

  const DATE_AS_STRING = '2025-06-01T10:00:00Z';
  const DATE_AS_DATE = new Date(DATE_AS_STRING);

  beforeEach(() => {
    sinchEvents = new VoiceV2SinchEvents({
      serviceId: SERVICE_ID,
      serviceSecret: SERVICE_SECRET,
    });
  });

  it('should authorize a valid service authorization header', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': VALID_AUTHORIZATION,
    };
    const validationStatus = sinchEvents.validateAuthenticationHeader(
      headers, BODY, PATH, METHOD,
    );
    expect(validationStatus).toBeTruthy();
  });

  it('should reject an invalid authorization header', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': `service ${SERVICE_ID}:invalid-signature`,
    };
    const validationStatus = sinchEvents.validateAuthenticationHeader(
      headers, BODY, PATH, METHOD,
    );
    expect(validationStatus).toBeFalsy();
  });

  it('should reject a missing authorization header', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
    };
    const validationStatus = sinchEvents.validateAuthenticationHeader(
      headers, BODY, PATH, METHOD,
    );
    expect(validationStatus).toBeFalsy();
  });

  it('should reject an Application authorization scheme', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': `Application ${SERVICE_ID}:EWFtVTrykdhMTdyYSbn40GBJpf5UBeggO9T99sdwLyY=`,
    };
    const validationStatus = sinchEvents.validateAuthenticationHeader(
      headers, BODY, PATH, METHOD,
    );
    expect(validationStatus).toBeFalsy();
  });

  it('should throw when credentials are missing', () => {
    const unconfigured = new VoiceV2SinchEvents();
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': VALID_AUTHORIZATION,
    };
    expect(() => unconfigured.validateAuthenticationHeader(
      headers, BODY, PATH, METHOD,
    )).toThrow('The service ID and secret must be defined');
  });

  it('should parse a call.incoming event and revive dates', () => {
    const payload = {
      event: 'call.incoming',
      call: {
        callId: '01AN4Z07BY79KA1307SR9X4MV3',
        projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
        serviceId: SERVICE_ID,
        sessionId: '01AN4Z07BY79KA1307SR9X4MV2',
        callName: 'incoming',
        direction: 'INBOUND',
        originationType: 'PHONE',
        callType: 'PHONE',
        from: {
          type: 'PHONE',
          phone: {
            number: '+14155552671',
          },
        },
        to: {
          type: 'PHONE',
          phone: {
            number: '+46735224800',
          },
        },
        callResult: 'INITIATED',
        startTime: DATE_AS_STRING,
        callRate: {
          currencyCode: 'USD',
          amount: '0.0060',
        },
        callResourceUrl: 'https://voice.api.sinch.com/v2/projects/5c5bf2b1-35ae-4825-ab89-457e07bb60e6/calls/01AN4Z07BY79KA1307SR9X4MV3',
      },
    };
    const parsedResult = sinchEvents.parseEvent(payload) as Voice.v2.WebhookRequest;
    expect(parsedResult.event).toBe('call.incoming');
    expect(parsedResult.call.callName).toBe('incoming');
    expect(parsedResult.call.startTime).toStrictEqual(DATE_AS_DATE);
  });

  it('should parse a call.webhook.* event from a JSON string', () => {
    const payload = JSON.stringify({
      event: 'call.webhook.menu-selection',
      call: {
        callId: '01AN4Z07BY79KA1307SR9X4MV3',
        projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
        serviceId: SERVICE_ID,
        sessionId: '01AN4Z07BY79KA1307SR9X4MV2',
        direction: 'INBOUND',
        originationType: 'PHONE',
        callType: 'PHONE',
        callResult: 'IN_PROGRESS',
        startTime: DATE_AS_STRING,
        answerTime: '2025-06-01T10:00:03Z',
        callRate: {
          currencyCode: 'USD',
          amount: '0.0060',
        },
        callResourceUrl: 'https://voice.api.sinch.com/v2/projects/5c5bf2b1-35ae-4825-ab89-457e07bb60e6/calls/01AN4Z07BY79KA1307SR9X4MV3',
      },
      menu: {
        menuName: 'main',
        input: '1',
      },
    });
    const parsedResult = VoiceV2SinchEvents.parseEvent(payload);
    expect(parsedResult.event).toBe('call.webhook.menu-selection');
    expect(parsedResult.menu?.menuName).toBe('main');
    expect(parsedResult.call.answerTime).toStrictEqual(new Date('2025-06-01T10:00:03Z'));
  });

  it('should throw an error when parsing a random object', () => {
    const payload = {
      unknownProperty: 'anyValue',
    };
    expect(() => sinchEvents.parseEvent(payload)).toThrow('Unknown Voice v2 event');
  });

  it('should throw an error when parsing a non-voice event type', () => {
    const payload = {
      event: 'unknown',
      call: {},
    };
    expect(() => sinchEvents.parseEvent(payload)).toThrow('Unknown Voice v2 event type: unknown');
  });

  it('should serialize a webhook response', () => {
    const response: Voice.v2.WebhookResponse = {
      callName: 'incoming',
      commands: [
        {
          command: 'messages',
          messages: [
            {
              type: 'SAY',
              say: {
                text: 'Thank you for calling. Goodbye.',
                voiceName: 'Emma',
              },
            },
          ],
        },
        {
          command: 'hangup',
        },
      ],
    };
    const serialized = sinchEvents.serializeResponse(response);
    expect(JSON.parse(serialized)).toEqual(response);
    expect(VoiceV2SinchEvents.serializeResponse(response)).toEqual(serialized);
  });
});
