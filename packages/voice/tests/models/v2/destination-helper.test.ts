import { Voice } from '../../../src';

describe('Voice v2 destination helper', () => {
  const { Destination } = Voice.v2;

  describe('phone', () => {
    it('should build a phone destination from a number', () => {
      const destination = Destination.phone('+15550001111');

      expect(destination).toBeInstanceOf(Voice.v2.DestinationPhone);
      expect(destination).toEqual({
        type: 'PHONE',
        phone: {
          number: '+15550001111',
        },
      });
    });
  });

  describe('sip', () => {
    it('should add a sip scheme and optional fields', () => {
      const destination = Destination.sip({
        type: 'SIP',
        sip: {
          endpoint: 'user@example.com',
        },
        transport: 'TCP',
        callHeaders: [{
          key: 'X-Call',
          value: '1',
        }],
      });

      expect(destination).toBeInstanceOf(Voice.v2.DestinationSip);
      expect(destination).toBeInstanceOf(Voice.v2.GenericSipEndpoint);
      expect(destination).toBeInstanceOf(Voice.v2.SipEndpoint);
      expect(destination).toEqual({
        type: 'SIP',
        sip: {
          endpoint: 'sip:user@example.com',
          transport: 'TCP',
          callHeaders: [{
            key: 'X-Call',
            value: '1',
          }],
        },
      });
    });

    it('should keep an existing sip scheme', () => {
      const destination = Destination.sips({
        type: 'SIP',
        sip: {
          endpoint: 'sip:user@example.com',
        },
      });

      expect(destination.sip).toEqual({
        endpoint: 'sip:user@example.com',
      });
    });

    it('should add a sips scheme when the endpoint has none', () => {
      const destination = Destination.sips({
        type: 'SIP',
        sip: {
          endpoint: 'user@example.com',
        },
      });

      expect(destination.sip.endpoint).toBe('sips:user@example.com');
    });
  });

  describe('sipFrom', () => {
    it('should add a sip scheme and a display name', () => {
      const destination = Destination.sipFrom({
        type: 'SIP',
        sip: {
          endpoint: 'user@example.com',
        },
        displayName: 'Alice',
      });

      expect(destination).toBeInstanceOf(Voice.v2.DestinationSipFrom);
      expect(destination).toBeInstanceOf(Voice.v2.GenericSipEndpoint);
      expect(destination).toBeInstanceOf(Voice.v2.SipEndpoint);
      expect(destination).toEqual({
        type: 'SIP',
        sip: {
          endpoint: 'sip:user@example.com',
          displayName: 'Alice',
        },
      });
    });

    it('should add a sips scheme for sipsFrom', () => {
      const destination = Destination.sipsFrom({
        type: 'SIP',
        sip: {
          endpoint: 'user@example.com',
        },
      });

      expect(destination.sip).toEqual({
        endpoint: 'sips:user@example.com',
      });
    });
  });

  describe('stream and voiceRelay', () => {
    it('should set only the stream endpoint', () => {
      const destination = Destination.stream('wss://example.com/audio');

      expect(destination).toEqual({
        type: 'STREAM',
        stream: {
          endpoint: 'wss://example.com/audio',
        },
      });
    });

    it('should build a voice relay destination', () => {
      const destination = Destination.voiceRelay({
        endpoint: 'wss://example.com/relay',
        ttsVoice: 'Emma',
        sttLanguage: 'en-US',
        enableInterruptions: true,
        callHeaders: [{
          key: 'X-Relay',
          value: '1',
        }],
      });

      expect(destination).toEqual({
        type: 'VOICE_RELAY',
        voiceRelay: {
          endpoint: 'wss://example.com/relay',
          ttsVoice: 'Emma',
          sttLanguage: 'en-US',
          enableInterruptions: true,
          callHeaders: [{
            key: 'X-Relay',
            value: '1',
          }],
        },
      });
    });
  });

  describe('of', () => {
    it('should default an untagged value to a phone destination', () => {
      const destination = Destination.of('+15550001111');

      expect(destination).toBeInstanceOf(Voice.v2.DestinationPhone);
      expect(destination).toEqual({
        type: 'PHONE',
        phone: {
          number: '+15550001111',
        },
      });
    });

    it('should strip a phone tag', () => {
      const destination = Destination.of('phone:+15550001111');

      expect(destination).toEqual({
        type: 'PHONE',
        phone: {
          number: '+15550001111',
        },
      });
    });

    it('should return a base SIP destination for sip and sips tags', () => {
      const sip = Destination.of('sip:user@example.com');
      const sips = Destination.of('sips:user@example.com');

      expect(sip).toBeInstanceOf(Voice.v2.GenericSipEndpoint);
      expect(sip).toBeInstanceOf(Voice.v2.SipEndpoint);
      expect(sip).not.toBeInstanceOf(Voice.v2.DestinationSip);
      expect(sip).not.toBeInstanceOf(Voice.v2.DestinationSipFrom);
      expect(sip).toEqual({
        type: 'SIP',
        sip: {
          endpoint: 'sip:user@example.com',
        },
      });
      expect(sips).toEqual({
        type: 'SIP',
        sip: {
          endpoint: 'sips:user@example.com',
        },
      });
    });

    it('should strip a stream tag and set only the endpoint', () => {
      const destination = Destination.of('stream:wss://example.com/audio');

      expect(destination).toBeInstanceOf(Voice.v2.DestinationStream);
      expect(destination).toEqual({
        type: 'STREAM',
        stream: {
          endpoint: 'wss://example.com/audio',
        },
      });
    });

    it('should reject an unrecognized tag', () => {
      expect(() => {
        Destination.of('https://example.com/audio');
      }).toThrow('destination "https://example.com/audio" is not recognized');
    });
  });
});
